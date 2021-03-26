# LogUI Server Changelog

This Markdown file contains the `CHANGELOG` for LogUI server. Changes are made as per the [GNU CHANGELOG Style Guide](https://www.gnu.org/prep/standards/html_node/Style-of-Change-Logs.html).

```

2021-01-15  Version 0.4.0

    Implemented basic repository structure, including working build.

    * React application in progress -- login functionality added.
    * Codebase working strictly in a development environment only; not meant for release.

2021-03-26  Version 0.5.0

    Works with LogUI client version 0.5.0.

    Basic functionality implemented. Repository has been hevily reworked since the 0.4.0 release. Version 0.5.0 is the first version we're happy to let people try out. Hopefully nothing will break.

    * Updated Python environment requirements, and npm for the JavaScript side of things.
    * Added React application for management of the LogUI server instance (the control application).
    * Functional Dockerised environment, complete with scripts to instantiate the .env file (along with Windows PowerShell and batch variants).
    * Use of MongoDB to capture interaction data.
    * Basic Django applications and data models to handle capturing and management of data.
    * Functional WebSocket server to handle incoming requests from the LogUI client.
    * Functional basic authorisation via use of an encrypted string.
```