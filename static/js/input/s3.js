$(() => {
    const API_ROOT = 'https://uub1w3mdvh.execute-api.us-east-1.amazonaws.com/Prod/';

    function downloadFile(url) {
        const a = document.createElement('a');
        a.href = url;
        a.click();
    }

    const $form = $('form#s3');
    const $status = $('span#processing-status');

    function reset(alertMsg) {
        $status.html('');
        $form.find('input').attr('disabled', false);
        alertMsg && alert(alertMsg);
    }

    $form.submit(() => {
        const files = $form.find('input[name=file]')[0].files;

        if (files.length === 0) {
            alert('Please choose a file to upload!');
            return false;
        }

        $form.find('input').attr('disabled', true);
        $.get(API_ROOT + 'upload/')
            .done(response => {
                const form = new FormData();
                for (const [k, v] of Object.entries(response.fields))
                    form.append(k, v);
                form.append('file', files[0]);

                const key = response.fields.key;

                function checkStatus(interval, callback) {
                    $.get(
                        API_ROOT + 'download/',
                        {key: key},
                    )
                        .done((response) => {
                            switch (response.status) {
                                case 'success':
                                    $status.html('Success!');
                                    callback(response.url);
                                    return;

                                case 'processing':
                                    setTimeout(() => {
                                        checkStatus(interval, callback);
                                    }, interval);
                                    return;

                                case 'error':
                                default:
                                    reset('Conversion failed');
                                    return;
                            }
                        })
                        .fail(() => {
                            reset('Conversion failed');
                        })
                    ;
                }

                $status.html('Uploading...');
                $.ajax({
                    type: 'POST',
                    url: response.url,
                    data: form,
                    processData: false,
                    contentType: false,
                })
                    .done(() => {
                        $status.html('Processing... (this may take a few minutes)');
                        checkStatus(5000, downloadFile);
                    })
                    .fail(() => {
                        reset('Upload failed');
                    })
                ;
            })
            .fail(() => {
                reset('Upload failed');
            })
        ;

        return false; // Prevent default behavior since we are doing AJAX
    });
});
