# Notes
- I learned what markdown is and how to style this file
- Commit essentially saves your changes, push then updates the changes to main file and pull updates file on separate computer

- **IP Address** http://50.19.114.36
- ssh -i keypair260.pem ubuntu@50.19.114.36
**Technology Stack:** Software that a particular company uses to develop/maintain their product. There are acronyms for more common stacks but most stacks are dependent upon company needs

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
  - **IP Address**: Unique for each device. DNS translates it to domain name.
  - **DNS Record**: Contains information that maps domain names to specific resources, such as IP addresses or other services
      - A type record: Represents root domain and public IP Address
      - Wildcard subdomain (*) allows for any subdomain (recipe.pronutrilog.click)
      - SOA (Start of Authority) Record: Provides contact information about the owner of this domain name.
      - NS (Name Server) Record: Contains the names of the authoritative name servers that authorize you to place DNS records in this DNS server.
- **TLD**: Top-Level Domain: Organize and group sites (.click)
## Caddy

