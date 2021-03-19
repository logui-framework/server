# LogUI Server <a href="https://www.tudelft.nl"><img align="right" width="100" src="./.meta/tudelft.svg" /></a>

**Welcome to LogUI!** *LogUI* is a powerful, framework-agnostic client-side JavaScript library that can be used for logging interactions that take place on a webpage. Primarily designed for *Interactive Information Retrieval (IIR)* experiments, LogUI can in theory be used on any page or site that you wish to track fine-grained user interactions with UI components.

This repository houses the LogUI server component. It's a Dockerised, containerised service that you can spin up on a computer with the appropriate version of Docker installed. LogUI server works in tandem with the LogUI client library, to be used as part of any web application or website that you wish to track interactions on. You can find the LogUI client at [this repository](https://github.com/logui-framework/client/).

## About LogUI

The LogUI library is implemented by [Dr David Maxwell](https://github.com/maxwelld90/), a postdoctoral researcher at [TUDelft](https://www.tudelft.nl/) in the Netherlands. It has been developed in the Lambda Lab, headed by [Dr Claudia Hauff](https://chauff.github.io/). The library is borne out of the need for infrastructure that allows one to undertake the logging of user interactions in a consistent way, rather than the piecemeal approach that we've seen in IIR experimentation.

We think that a one-size-fits-all logging library is just the ticket for your experiments!

## Using LogUI in Experiments?

We're thrilled that you're using LogUI in your experiments! We ask that in return you provide due credit for this work. If you have a paper associated with your experiment, please do cite the associated demonstration paper that was published at [ECIR 2021](https://www.ecir2021.eu/). You can find the BibTeX source for the paper below.

```bibtex
@inproceedings{maxwell2021logui,
    author = {Maxwell, David and Hauff, Claudia},
    title = "{LogUI: Contemporary Logging Infrastructure for Web-Based Experiments}",
    booktitle = {Proceedings of the 43\textsuperscript{th} ECIR},
    year = {2021},
    note={(In press)},
}
```

## Documentation and First Run Guide

For documentation on LogUI server, please go and check out the [corresponding Wiki](https://github.com/logui-framework/client/wiki/) associated with this repository. As an example, you'll find an in-depth [first run guide](https://github.com/logui-framework/server/wiki/First-Run-Guide), showing you exactly what you need to do to get LogUI server running on your computer of choice. More detailed information about the specifics of LogUI server, and what you can do with it, are also available on the Wiki.

## Found a Bug or have a Feature Request?

It would be great to hear from you! Please [raise an issue in this repository](https://github.com/logui-framework/server/issues) and we can discuss what options that can be pursued to resolve it.