$(() => {
    const API_ROOT = 'https://cqvuvlus83.execute-api.us-west-1.amazonaws.com/Prod/';

    const $form = $('form#s3');
    $form.submit(() => {
        const files = $form.find('input[name=file]')[0].files;

        if (files.length === 0) {
            alert('Please choose a file to upload!');
            return false;
        }

        $.get(API_ROOT + 'presign/')
            .done(response => {
                const form = new FormData();
                for (const [k, v] of Object.entries(response.fields))
                    form.append(k, v);
                form.append('file', files[0]);
                $.ajax({
                    type: 'POST',
                    url: response.url,
                    data: form,
                    processData: false,
                    contentType: false,
                })
                    .done(response => {
                        // TODO
                    })
                    .fail(() => {
                        alert('Upload failed');
                    })
                ;
            })
            .fail(() => {
                alert('Upload failed');
            })
        ;

        return false; // Prevent default behavior since we are doing AJAX
    });
});
