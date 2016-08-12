# Audiobook Manifest

Unlike ebooks, there is no single dominant format for audiobooks or even a real attempt to standardize them.

The goal of this document is to provide an audiobook profile for the [EPUB BFF manifest] (https://github.com/dauwhe/epub31-bff) that will cover the following requirements:

- provide metadata
- list the different components of an audiobook
- support multiple audio formats and means of accessing an audiobook (streaming or downloads)

## Metadata

The core metadata for the audiobook manifest are based on [the default context for EPUB BFF](https://github.com/dauwhe/epub31-bff/tree/master/contexts/default) with the following additional requirements:

- it must include a `duration` expressed as a ISO 8601 duration
- it must also include the `readBy` element

While the format and bitrate of the audio files that constitute the audiobook must be provided per file, it is also recommended to include:

- the main media type used for the audio files using the `type` element
- the bitrate for those files using the `bitrate` element

## Listing Audio Files

An audiobook is divided into one or more audio files, which are all listed in the `spine` of the manifest, in reading order.

In addition to the normal requirements of a `spine`, all link objects have the following additional requirements:
 
 - all link objects must point strictly to audio files
 - every link object must include a `duration` expressed as a ISO 8601 duration 

## Example

In the following example, the audiobook is divided in two MP3 files but HTTP live streaming is also available as an alternative.

```json
{
  "metadata": {
    "@type": "http://bib.schema.org/Audiobook",
    "identifier": "urn:isbn:9780000000001",
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "readBy": "Leonard Richardson",
    "language": "en",
    "publisher": "Whale Publishing Ltd.",
    "modified": "2016-02-18T10:32:18Z",
    "duration": "1H12M"
  },

  "links": [
    {"rel": "self", "href": "http://example.org/manifest.json", "type": "application/audiobook-manifest+json"},
    {"rel": "alternate", "href": "http://example.org/audiobook.m3u", "type": "audio/mpegurl", "bitrate": 64}
  ],

  "spine": [
    {"href": "http://example.org/part1.mp3", "type": "audio/mpeg", "bitrate": 128, "duration":"33M", "title": "Part 1"}, 
    {"href": "http://example.org/part2.mp3", "type": "audio/mpeg", "bitrate": 128, "duration": "20M", "title": "Part 2"}, 
    {"href": "http://example.org/part3.mp3", "type": "audio/mpeg", "bitrate": 128, "duration": "19M", "title": "Part 3"}
  ],
  
  "timeline": [
    {"href": "http://example.org/part1.mp3#t=0,299", "title": "Introduction"},
    {"href": "http://example.org/part1.mp3#t=300,1319", "title": "Chapter 1"},
    {"href": "http://example.org/part1.mp3#t=1320", "title": "Chapter 2"},
    {"href": "http://example.org/part2.mp3#t=0,539", "title": "Chapter 3"},
    {"href": "http://example.org/part2.mp3#t=540,839", "title": "Chapter 4"},
    {"href": "http://example.org/part2.mp3#t=840", "title": "Chapter 5"},
    {"href": "http://example.org/part3.mp3#t=0,599", "title": "Chapter 6"},
    {"href": "http://example.org/part3.mp3#t=600", "title": "Chapter 7"},
  ]
}
```
