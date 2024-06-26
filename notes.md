# Notes
- I learned what markdown is and how to style this file
- Commit essentially saves your changes, push then updates the changes to main file and pull updates file on separate computer
- IANA: Governing body over the internet

- **IP Address** http://50.19.114.36
- **Technology Stack:** Software that a particular company uses to develop/maintain their product. There are acronyms for more common stacks but most stacks are dependent upon company needs

## Quick Copy
- ./deployFiles.sh -k ~/.ssh/keypair260.pem -h pronutrilog.click -s startup
- ssh -i keypair260.pem ubuntu@pronutrilog.click
- ./deployService.sh -k ~/.ssh/keypair260.pem -h pronutrilog.click -s startup

## AWS EC2
- Instance: Virtual Server that uses hardware in N Virginia
- Terminating: Destroys virtual server
- Stopping: Powers down device
- Elastic IP Address:
    - Allows for server to stop without changing IP Address
## AWS Route 53
- Creating Domain name allows for HTTPS - not available with just an ip address
- **DNS**: Domain Name System
  - **Domain Name**: pronutrilog.click
      - Use 'dig' [domain name] to get IP Address
  - **IP Address**: Unique for each device. DNS translates it to domain name.
  - **DNS Record**: Contains information that maps domain names to specific resources, such as IP addresses or other services
      - A type record: Represents root domain and public IP Address
      - Wildcard subdomain (*) allows for any subdomain (recipe.pronutrilog.click)
      - SOA (Start of Authority) Record: Provides contact information about the owner of this domain name.
      - NS (Name Server) Record: Contains the names of the authoritative name servers that authorize you to place DNS records in this DNS server.
- **TLD**: Top-Level Domain: Organize and group sites (.click)
    - The possible list of TLDs is controlled by ICANN, one of the governing boards of the internet.
    - Root domain: byu.edu google.com startup.click
    - whois [root domain]: Gives info about root domain 
## Caddy 
- Caddy is a web service that listens for incoming HTTP requests. Caddy then either serves up the requested static files or routes the request to another web service
- **Gateway/Reverse Proxy:** Ability to route requests and allows you to expose multiple web services (i.e. your project services) as a single external web service
- **HTML Files:** Are served by caddy in the **public** directory when sshing
## HTTPS TLS Web Certificates
- **HTTPS:** ( Secure Hypertext Transport Protocol ) Secure Connection using **TLS** that defines the rules for how messages are formatted and transmitted over the internet and how web servers and browsers should respond to various commands.
- **TLS:** works by negotiating a shared secret that is then used to encrypt data.
- **Web Certificates:**
    - Generated by third party company
    - The certificate issuer is responsible for verifying that the certificate owner actually owns the domain name represented by the certificate.
    - Certificates have to be renewed - Caddy uses "Let's Encrypt" to safely and freely renew the certification with new encryption.
    - **ACME** is the protocol for communication between certificate authorities. (Built into Caddy and many other softwares)
- **Verbs**: Describe what the HTTP Request is looking for
    - GET/POST/PUT/DELTE/OPTIONS
- **Status Codes**:
      - 1xx: Informational
      - 2xx: Success
      - 3xx Redirect
      - 4xx Client Errors
      - 5xx Server Errors
- **Headers**: Specify metadata - security, caching, data formats, cookies
- **Body**: Defined by Content-Type - HTML text, image, JSON, JavaScript
- **Cookies**: HTTP is stateless thus doesn't know anything about previous or future request without cookies

## Ports
- 0 to 1023: Standard Protocols
- 1024 to 49151: Assigned to requesting entities
- 49152 to 65535: Dynamic
 
## HTML
- Stands for HyperTextMarkupLanguage
- table structure:
    - table - thead - tr - td
    - ul - li

## Review
- You can load fonts from Google with
- CSS Box Model: Margin, Border, Padding, Content
- Padding puts space around content
- chmod +x deploy.sh makes script executable
      - sudo executes the file
- var: function scoped
- let: block scoped within {}

## TCP/IP Layers
- Application: (HTTPS)	Functionality like web browsing
- Transport: (TCP) Moving connection information packets
- Internet: (IP) Establishing connections
- Link:	(Google Fiber) Hardware	Physical connections

## Web Servers
- **Microservices:** Web services that provide a single functional purpose
- **We Service Gateway:** Looks at the request and maps it to the other services running on a different ports. Commonly on port 443

## Node.js
- Allows Javascript to be run outside of the browser - can be a full stack
- Uses V8 to read and execute in Chrome or Node
- NVM: Node Version Manager - allows for executing JS directly in console
- NPM: Node Package Manager - Allows access to JS packages (like libraries)
      - Package.json contains 3 things:
          1. Metadata about your project like name, default entry JS file
          2. Commands to execute, run, test or distribute code
          3. Packages the project depends on
      - More packages available [NPM Website](https://www.npmjs.com/)
## Express
- **Middleware**: represents componentized pieces of functionality.
    - For multiple middleware calls the next parameter  must be passed otherwise it stops.
- **Mediator**: loads the middleware components and determines their order of execution. When a request comes to the mediator it then passes the request around to the middleware components.(Express is a mediator and comes with default middleware functions.)

## SOP/CORS
- **SOP**: Same Origin Policy - only allows JavaScript to make requests to a domain if it is the same domain that the user is currently viewing. A request from byu.iinstructure.com for service endpoints that are made to byu.instructure.com would fail because the domains do not match.
- **CORS**: Cross Origin Resource Sharing - allows the client (e.g. browser) to specify the origin of a request and then let the server respond with what origins are allowed. The server may say that all origins are allowe

## Service Design
- Should model users mind not programming infrastructure
- Exposing Endpoints
    - RPC (Remote Procedure Calls): exposes service endpoints as simple function calls, usually just leverages the POST
    - REST (Representational State Transfer): Uses resources
    - GraphQL: Focuses on manipulation of data, basically one endpoint with filters - allows user a lot of access
 
## PM2 - Process Manager
- **Daemon**: keep programs running after a shutdown. Term daemon comes from the idea of something that is always there working in the background.

## Security
- **Terminology**
    - Hacking - The process of making a system do something it's not supposed to do.
    - Exploit - Code or input that takes advantage of a programming or configuration flaw.
    - Attack Vector - The method that a hacker employs to penetrate and exploit a system.
    - Attack Surface - The exposed parts of a system that an attacker can access. For example, open ports (22, 443, 80), service endpoints, or user accounts.
    - Attack Payload - The actual code, or data, that a hacker delivers to a system in order to exploit it.
    - Input sanitization - "Cleaning" any input of potentially malicious data.
    - Black box testing - Testing an application without knowledge of the internals of the application.
    - White box testing - Testing an application by with knowledge of the source code and internal infrastructure.
    - Penetration Testing - Attempting to gain access to, or exploit, a system in ways that are not anticipated by the developers.
    - Mitigation - The action taken to remove, or reduce, a threat.
- **Motivation For Attackers**:
    - Disruption - By overloading a system, encrypting essential data, or deleting critical infrastructure, an attacker can destroy normal business operations. This may be an attempt at extortion, or simply be an attempt to punish a business that that attacker does not agree with.
    - Data exfiltration - By privately extracting, or publicly exposing, a system's data, an attacker can embarrass the company, exploit insider information, sell the information to competitors, or leverage the information for additional attacks.
    - Resource consumption - By taking control of a company's computing resources an attacker can use it for other purposes such as mining cryptocurrency, gathering customer information, or attacking other systems.
- **Hacking Techniques**
    - Injection: When an application interacts with a database on the backend, a programmer will often take user input and concatenate it directly into a search query. This allows a hacker can use a specially crafted query to make the database reveal hidden information or even delete the database.
    - Cross-Site Scripting (XSS): A category of attacks where an attacker can make malicious code execute on a different user's browser. If successful, an attacker can turn a website that a user trusts, into one that can steal passwords and hijack a user's account.
    - Denial of Service: This includes any attack where the main goal is to render any service inaccessible. This can be done by deleting a database using an SQL injection, by sending unexpected data to a service endpoint that causes the program to crash, or by simply making more requests than a server can handle.
    - Credential Stuffing: People have a tendency to reuse passwords or variations of passwords on different websites. If a hacker has a user's credentials from a previous website attack, then there is a good chance that they can successfully use those credentials on a different website. A hacker can also try to brute force attack a system by trying every possible combination of password.
    - Social engineering - Appealing to a human's desire to help, in order to gain unauthorized access or information.
- **Mitigation**
    - Sanitize input data - Always assume that any data you receive from outside your system will be used to exploit your system. Consider if the input data can be turned into an executable expression, or can overload computing, bandwidth, or storage resources.
    - Logging - It is not possible to think of every way that your system can be exploited, but you can create an immutable log of requests that will expose when a system is being exploited. You can then trigger alerts, and periodically review the logs for unexpected activity.
    - Traps - Create what appears to be valuable information and then trigger alarms when the data is accessed.
    - Educate - Teach yourself, your users, and everyone you work with, to be security minded. Anyone who has access to your system should understand how to prevent physical, social, and software attacks.
    - Reduce attack surfaces - Do not open access anymore than is necessary to properly provide your application. This includes what network ports are open, what account privileges are allowed, where you can access the system from, and what endpoints are available.
    - Layered security - Do not assume that one safeguard is enough. Create multiple layers of security that each take different approaches. For example, secure your physical environment, secure your network, secure your server, secure your public network traffic, secure your private network traffic, encrypt your storage, separate your production systems from your development systems, put your payment information in a separate environment from your application environment. Do not allow data from one layer to move to other layers. For example, do not allow an employee to take data out of the production system.
    - Least required access policy - Do not give any one user all the credentials necessary to control the entire system. Only give a user what access they need to do the work they are required to do.
    - Safeguard credentials - Do not store credentials in accessible locations such as a public GitHub repository or a sticky note taped to a monitor. Automatically rotate credentials in order to limit the impact of an exposure. Only award credentials that are necessary to do a specific task.
    - Public review - Do not rely on obscurity to keep your system safe. Assume instead that an attacker knows everything about your system and then make it difficult for anyone to exploit the system. If you can attack your system, then a hacker will be able to also. By soliciting public review and the work of external penetration testers, you will be able to discover and remove potential exploits.
 
## Toolchains
- Code repository - Stores code in a shared, versioned, location.
- Linter - Removes, or warns, of non-idiomatic code usage.
- Prettier - Formats code according to a shared standard.
- Transpiler - Compiles code into a different format. For example, from JSX to JavaScript, TypeScript to JavaScript, or SCSS to CSS.
- Polyfill - Generates backward compatible code for supporting old browser versions that do not support the latest standards.
- Bundler - Packages code into bundles for delivery to the browser. This enables compatibility (for example with ES6 module support), or performance (with lazy loading).
- Minifier - Removes whitespace and renames variables in order to make code smaller and more efficient to deploy.
- Testing - Automated tests at multiple levels to ensure correctness.
- Deployment - Automated packaging and delivery of code from the development environment to the production environment.

## Review
- Daemon: start when computer reboots, runs without a user, forks other processes, PM2 is an example of a daemon
- HTTP: 80
- SSH: 22
- HTTPS: 443
- JSX: Combines HTML CSS, Componentize/Cmoposability
- NPM install was: Locks version of ws package, adds dependency to package.json, adds ws source code to node_modules directory
- 

## Console Command List
- echo - Output the parameters of the command
- cd - Change directory
- mkdir - Make directory
- rmdir - Remove directory
- rm - Remove file(s)
- mv - Move file(s)
- cp - Copy files
- ls - List files
- curl - Command line client URL browser
- grep - Regular expression search
- find - Find files
- top - View running processes with CPU and memory usage
- df - View disk statistics
- cat - Output the contents of a file
- less - Interactively output the contents of a file
- wc - Count the words in a file
- ps - View the currently running processes
- kill - Kill a currently running process
- sudo - Execute a command as a super user (admin)
- ssh - Create a secure shell on a remote computer
- scp - Securely copy files to a remote computer
- history - Show the history of commands
- ping - Check if a website is up
- tracert - Trace the connections to a website
- dig - Show the DNS information for a domain
- man - Look up a command in the manual

## Regular Expression Syntax
**Literal Characters:**
Matches the character itself: a, b, c, !, $, etc.

**Metacharacters:**
- . (dot): Matches any single character except newline.
- ^ (caret): Matches the beginning of the string.
- $ (dollar sign): Matches the end of the string.
- [] (square brackets): Matches a character set. Ex: [abc] matches any of the characters 'a', 'b', or 'c'.
- - (hyphen): Defines a range within a character set. Ex: [a-z] matches any lowercase letter from 'a' to 'z'.
- \w (word character): Matches any alphanumeric character or underscore.
- \d (digit): Matches any single digit (0-9).
- \s (whitespace): Matches any whitespace character (space, tab, newline, etc.).
- \b (word boundary): Matches the boundary between a word and a non-word character.

**Quantifiers:**
- '*' (asterisk): Matches the preceding character zero or more times. Ex: ab*c matches "ac", "abc", "abbc", etc.
- '+' (plus sign): Matches the preceding character one or more times. Ex: ab+c matches "abc", "abbc", "abbbc", etc., but not "ac".
- '?' (question mark): Matches the preceding character zero or one time. Ex: colou?r matches both "color" and "colour".
- {n}: Matches the preceding character exactly n times. Ex: ab{2}c matches "abbc".
- {n,m}: Matches the preceding character at least n but no more than m times. Ex: a{2,3}b matches "aabb" or "aaab".

**Grouping:**
- () (parentheses): Groups characters to define a subexpression. Ex: (ab)+c matches "abcabcabc".
  
**Backreferences:**
- '\n' (backslash followed by a number): Matches the nth captured group in the pattern. Ex: (\d{3})-(\d{3})-(\d{4}) captures three groups of digits in a phone number format.

**Special Sequences:**
- '\t': Matches a tab character.
- '\n': Matches a newline character.
- '\r': Matches a carriage return character.

**Flags:**
- i (case-insensitive): Makes the pattern case-insensitive.
- g (global): Matches all occurrences of the pattern in the string.
- m (multiline): Treats the string as multiple lines for anchors like ^ and $.

