# Audiobook Manifest

## Example

```json
{
  "metadata": {
    "@type": "http://bib.schema.org/Audiobook",
    "identifier": "urn:isbn:9780000000001",
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "narrator": ["Joe Speaker", "Lucy Narrator"],
    "language": "en",
    "publisher": "Whale Publishing Ltd.",
    "published": "2016-02-01",
    "modified": "2016-02-18T10:32:18Z",
    "duration": 4320,
    "type": "audio/mpeg",
    "bitrate": 128
  },

  "links": [
    {"rel": "self", "href": "http://example.org/manifest.audiobook-manifest", "type": "application/audiobook+json"},
    {"rel": "cover", "href": "http://example.org/cover.jpeg", "type": "image/jpeg", "height": 300, "width": 300},
    {"rel": "alternate", "href": "http://example.org/audiobook.m3u", "type": "audio/mpegurl", "bitrate": 64}
  ],

  "spine": [
    {"href": "http://example.org/part1.mp3", "type": "audio/mpeg", "bitrate": 128, "duration": 1980, "title": "Part 1"}, 
    {"href": "http://example.org/part2.mp3", "type": "audio/mpeg", "bitrate": 128, "duration": 1200, "title": "Part 2"}, 
    {"href": "http://example.org/part3.mp3", "type": "audio/mpeg", "bitrate": 128, "duration": 1140, "title": "Part 3"}
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


## Introduction

There is no single dominant format for audiobooks and so far IDPF/W3C hasn't shown any particular interest in them.

The goal of this document is to provide an audiobook profile for the [Readium Web Publication Manifest](https://github.com/readium/webpub-manifest) that will cover the following requirements:

- provide metadata
- list the different components of an audiobook
- support multiple audio formats and means of accessing an audiobook (streaming or downloads)

While the Audiobook Manifest is technically a profile of the Web Publication Manifest, it has its own media type and file extension in order to maximize compatibilty with audio apps:

- its media type is `application/audiobook+json`
- its file extension is `.audiobook-manifest`

## Metadata

The core metadata for the audiobook manifest are based on [the default context for the Readium Web Publication Manifest](https://github.com/readium/webpub-manifest/tree/master/contexts/default) with the following additional requirements:

- it must include a `@type` element that identifies the manifest as an audiobook using the bib extension to schema.org: `http://bib.schema.org/Audiobook`
- it must include a `duration` element that provides the total duration of the audiobook
- it must also include the `narrator` element

While the format and bitrate of each audio file that constitute the audiobook are provided in the `spine`, it is also recommended to include:

- the main media type used for the audio files using the `type` element
- the bitrate for those files using the `bitrate` element

## Listing Audio Files

An audiobook is divided into one or more audio files, which are all listed in the `spine` of the manifest, in reading order.

In addition to the normal requirements of a `spine`, all link objects have the following additional requirements:
 
 - all link objects must point strictly to audio files
 - every link object must include a `duration` that provides the duration of each individual audio file

In addition, all link objects should also include the `bitrate` whenever possible.

## Cover

A manifest can also specify the cover of an audiobook using the `cover` relationship in `links`:

```json
"links": [{
  "rel": "cover", 
  "href": "http://example.org/cover.jpeg", 
  "type": "image/jpeg", 
  "height": 300, "width": 300}]
```


## Timeline

A manifest can also provide additional navigation through a `timeline` collection.

A timeline is a list of labels pointing to specific timestamps in an audiobook.

Each link object in a `timeline` collection has the following requirements:

- it must point to an audio file listed in the `spine` and use a media fragment to point to a specific timestamp
- it must provide a `title`
- it must not use `type`, `duration` or `bitrate` to avoid duplication with the `spine`

## Container

In order to facilitate distribution, both manifest and audio files can also be distributed using a container.

In this case, all files (individual audio files and manifest) must be contained in a ZIP where the manifest is at the root of the zip and named `manifest.json`.

The container also has the following properties:

- its file extension must be `.audiobook`
- its media type must be `application/audiobook+zip`

When an audiobook is distributed in a container (instead of simply as a manifest), the manifest has the following additional restrictions:

- the `spine` must strictly reference audio files that are present in the container
- to reference such files, all URIs in the `spine` must be relative to the manifest (at the root of the container)

## Live Demo

An Audiobook Manifest based on the [Librivox edition of Flatland](https://librivox.org/flatland-a-romance-of-many-dimensions-by-edwin-abbott-abbott/) is available at: https://hadriengardeur.github.io/audiobook-manifest/examples/flatland.audiobook-manifest

A proof of concept for an audiobook player is also available at: https://hadriengardeur.github.io/audiobook-manifest/examples/player/
