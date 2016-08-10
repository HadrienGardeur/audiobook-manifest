# Audiobook Manifest

Unlike ebooks, there is no single dominant format for audiobooks or even a real attempt to standardize them.

The goal of this document is to provide an audiobook profile for the [EPUB BFF manifest] (https://github.com/dauwhe/epub31-bff) that will cover the following requirements:

- provide metadata
- list the different components of an audiobook
- support multiple audio formats and means of accessing an audiobook (streaming or downloads)

## Example

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
    "duration": "20M"
  },

  "links": [
    {"rel": "self", "href": "http://example.org/manifest.json", "type": "application/epub+json", "profile": "audiobook"},
    {"rel": "alternate", "href": "http://example.org/audiobook.m3u", "type": "audio/mpegurl", "bitrate": 48}
  ],

  "spine": [
    {"href": "http://www.example.org/chapter1.mp3", "type": "audio/mpeg", "bitrate": 128, "duration": 600, "title": "Chapter 1"}, 
    {"href": "http://www.example.org/chapter2.mp3", "type": "audio/mpeg", "bitrate": 128, "duration": 920, "title": "Chapter 2"}
  ]
}
```
