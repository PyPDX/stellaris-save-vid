# Stellaris save visualizer

## Usage

1. Convert your Stellaris save file

    The conversion usually takes around a minute,
    depending on the size of your file.

    When finished, it would be downloaded automatically.

    To save time/ processing power, please reuse the JSON file
    - you won't get anything new if you convert again.

    If you keep getting errors, please contact developer (see below).

2. Open JSON file

3. Map

    Each node on the map is a star system.

    Owned systems will be colored by each empire's map color.
    Unowned systems are black and smaller.

    Squares are systems with upgraded starbases.

    Possible precursors are indicated with small dots to the right.

    | Color      | Precursor  |
    | ---        | ---        |
    | Gold       | Vultaum    |
    | Red        | Yuht       |
    | Gray       | First League |
    | Cyan       | Irassian   |
    | Blue       | Cybrex     |
    | Green      | Baol       |
    | Purple     | Zroni      |

    Mouse over each node to see details.

    Black lines are hyperlanes.
    Pink lines are wormholes.

## FAQ (preemptively...)

* Why are there two steps?

    First, two technical terms:
    serialization: save structured data into a file;
    deserialization: load structured data from a file.

    The save files for Stellaris are not using a standard serialization method.
    The same method is used for all Stellaris (and other PDX title) files,
    so PDX must have written their own serializer/deserializer.

    In order to interact with the data saved in a save file,
    we need to deserialize it first.
    However, without access to PDX's source code,
    there is no easy way to do it.
    I've managed to do it after some trial and error,
    but it takes a relatively long time for each file.

    And because deserializing the same file will always yield the same result,
    it would be unwise to do it on the same file over and over again.

    Thus, it is better to save the deserialized data using a standard serialization method,
    and load from there each time.

    JSON is an industry-standard serialization method,
    and it is especially well-integrated with the world of web.
    Since we are doing visualization on a web page,
    it is only sensible to store the data in JSON format.

* Since you are able to do this, can you edit my save file for me?

    NO.

    If you have a non-ironman save, please use the console yourself.

    If you have an ironman save...
    First of all, I'm not a fan of editing save files.
    Second, you will keep asking for different things because you can't think of everything the first time you ask me.
    Third, I made this project because it's fun for myself. I'm not doing free labor.

* Can I see the source code?

    Yes! The project is open source on [GitHub](https://github.com/PyPDX).

* It doesn't work.

    If you are not a programmer,
    please send your save file to <pypdx@michaelkim0407.com>,
    and I will take a look when I have time (no promises).

    If you are a programmer,
    you are more than welcome to submit fixes on GitHub.

* I also want this/that.

    Again, if you want to contribute as a programmer,
    feel free to do so.

    Otherwise, it depends on my mood.
