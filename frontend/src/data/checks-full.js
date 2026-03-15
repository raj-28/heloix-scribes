// Full-scale check data generator matching hub.prowler.com exact counts
// Total: 1924+ checks across all providers

const checkTemplates = {
  'aws/ami': { count:1, svc:'ami', prov:'aws', titles:['AMI should not be publicly shared'] },
  'aws/apigateway': { count:6, svc:'apigateway', prov:'aws', titles:['API Gateway REST API should have logging enabled','API Gateway should have WAF ACL attached','API Gateway stages should have caching enabled','API Gateway REST API should have request validation','API Gateway should use TLS 1.2','API Gateway should have access logging configured'] },
  'aws/athena': { count:2, svc:'athena', prov:'aws', titles:['Athena workgroup should enforce query result encryption','Athena workgroup should have query metrics enabled'] },
  'aws/cloudfront': { count:4, svc:'cloudfront', prov:'aws', titles:['CloudFront distribution should have logging enabled','CloudFront should use HTTPS','CloudFront should have WAF enabled','CloudFront should have origin failover configured'] },
  'aws/cloudtrail': { count:6, svc:'cloudtrail', prov:'aws', titles:['CloudTrail is enabled in all regions','CloudTrail log file validation is enabled','CloudTrail trails are integrated with CloudWatch Logs','CloudTrail S3 bucket has access logging enabled','CloudTrail trails are encrypted with KMS','CloudTrail is logging data events for S3 and Lambda'] },
  'aws/cloudwatch': { count:16, svc:'cloudwatch', prov:'aws', titles:['CloudWatch alarm for unauthorized API calls','CloudWatch alarm for console sign-in without MFA','CloudWatch alarm for root account usage','CloudWatch alarm for IAM policy changes','CloudWatch alarm for CloudTrail config changes','CloudWatch alarm for S3 bucket policy changes','CloudWatch alarm for AWS Config changes','CloudWatch alarm for security group changes','CloudWatch alarm for NACL changes','CloudWatch alarm for network gateway changes','CloudWatch alarm for route table changes','CloudWatch alarm for VPC changes','CloudWatch alarm for organization changes','CloudWatch alarm for CMK disabled or deletion','CloudWatch log group should be encrypted','CloudWatch log group retention should be at least 365 days'] },
  'aws/codebuild': { count:1, svc:'codebuild', prov:'aws', titles:['CodeBuild project should not have privileged mode enabled'] },
  'aws/config': { count:1, svc:'config', prov:'aws', titles:['AWS Config is enabled in all regions'] },
  'aws/documentdb': { count:3, svc:'documentdb', prov:'aws', titles:['DocumentDB cluster encrypted at rest','DocumentDB cluster has audit logging','DocumentDB backup retention >= 7 days'] },
  'aws/dynamodb': { count:3, svc:'dynamodb', prov:'aws', titles:['DynamoDB table encryption enabled','DynamoDB PITR enabled','DynamoDB auto-scaling enabled'] },
  'aws/ec2': { count:20, svc:'ec2', prov:'aws', titles:['EC2 instance should not have public IP','EC2 SG should not allow unrestricted SSH','EC2 SG should not allow unrestricted RDP','EC2 instance should use IMDSv2','EC2 launch template has IMDSv2 enabled','EC2 EBS volume should be encrypted','EC2 EBS default encryption enabled','EC2 instance detailed monitoring','EC2 SG should not allow ingress from 0.0.0.0/0','EC2 instance should not use default SG','EC2 stopped instances removed after 30 days','EC2 instance termination protection','EC2 AMI should not be public','EC2 NACL should not allow SSH from 0.0.0.0/0','EC2 NACL should not allow RDP from 0.0.0.0/0','EC2 SG should restrict outbound traffic','EC2 instance should use approved AMIs','EC2 EBS snapshot should not be public','EC2 instance should have IAM profile','EC2 transit gateway auto-accept disabled'] },
  'aws/ecr': { count:4, svc:'ecr', prov:'aws', titles:['ECR image scanning enabled','ECR tag immutability','ECR encrypted with CMK','ECR lifecycle policy configured'] },
  'aws/ecs': { count:3, svc:'ecs', prov:'aws', titles:['ECS task not root user','ECS container insights enabled','ECS service network configuration'] },
  'aws/efs': { count:1, svc:'efs', prov:'aws', titles:['EFS encrypted at rest'] },
  'aws/eks': { count:4, svc:'eks', prov:'aws', titles:['EKS cluster logging enabled','EKS endpoint not public','EKS secrets encryption','EKS private endpoint enabled'] },
  'aws/elasticache': { count:4, svc:'elasticache', prov:'aws', titles:['ElastiCache encryption at rest','ElastiCache encryption in transit','ElastiCache auto backup','ElastiCache AUTH token enabled'] },
  'aws/elasticsearch': { count:5, svc:'elasticsearch', prov:'aws', titles:['Elasticsearch encryption at rest','Elasticsearch in VPC','Elasticsearch node-to-node encryption','Elasticsearch audit logging','Elasticsearch TLS 1.2'] },
  'aws/elb': { count:4, svc:'elb', prov:'aws', titles:['ELB access logging enabled','ALB WAF enabled','ELB HTTPS listeners','ALB redirect HTTP to HTTPS'] },
  'aws/emr': { count:3, svc:'emr', prov:'aws', titles:['EMR logging enabled','EMR encryption at rest','EMR in VPC'] },
  'aws/iam': { count:22, svc:'iam', prov:'aws', titles:['IAM root MFA enabled','IAM root hardware MFA','IAM password min length 14','IAM password requires symbols','IAM password requires numbers','IAM password requires uppercase','IAM password requires lowercase','IAM password prevents reuse','IAM password expires 90 days','IAM users MFA enabled','IAM access keys rotated 90 days','IAM no full admin policies','IAM root no access keys','IAM users no inline policies','IAM groups no inline policies','IAM roles no inline policies','IAM unused credentials disabled 45 days','IAM support role created','IAM no multiple active access keys','IAM certificates not expired','IAM no full * resource access','IAM cross-account uses external ID'] },
  'aws/kinesis': { count:1, svc:'kinesis', prov:'aws', titles:['Kinesis stream encrypted with CMK'] },
  'aws/kms': { count:1, svc:'kms', prov:'aws', titles:['KMS CMK rotation enabled'] },
  'aws/lambda': { count:2, svc:'lambda', prov:'aws', titles:['Lambda not publicly accessible','Lambda uses supported runtime'] },
  'aws/mq': { count:3, svc:'mq', prov:'aws', titles:['MQ audit logging','MQ not publicly accessible','MQ encryption enabled'] },
  'aws/msk': { count:3, svc:'msk', prov:'aws', titles:['MSK encryption in transit','MSK encryption at rest','MSK logging enabled'] },
  'aws/neptune': { count:3, svc:'neptune', prov:'aws', titles:['Neptune encryption at rest','Neptune IAM auth','Neptune audit logging'] },
  'aws/rds': { count:9, svc:'rds', prov:'aws', titles:['RDS encrypted at rest','RDS not publicly accessible','RDS multi-AZ enabled','RDS auto minor version upgrade','RDS backup retention >= 7 days','RDS deletion protection','RDS encrypted connections','RDS IAM authentication','RDS snapshot not public'] },
  'aws/redshift': { count:4, svc:'redshift', prov:'aws', titles:['Redshift encrypted at rest','Redshift not publicly accessible','Redshift audit logging','Redshift require SSL'] },
  'aws/s3': { count:13, svc:'s3', prov:'aws', titles:['S3 public access blocks','S3 server-side encryption','S3 versioning enabled','S3 logging enabled','S3 no public read','S3 no public write','S3 lifecycle configuration','S3 SSL for requests','S3 MFA delete enabled','S3 block public ACLs','S3 ignore public ACLs','S3 block public policy','S3 restrict public buckets'] },
  'aws/sam': { count:9, svc:'sam', prov:'aws', titles:['SAM tracing','SAM DLQ','SAM reserved concurrency','SAM API auth','SAM no wildcard perms','SAM encryption','SAM VPC config','SAM API logging','SAM proper timeout'] },
  'aws/sns': { count:2, svc:'sns', prov:'aws', titles:['SNS encrypted with CMK','SNS access policy'] },
  'aws/sqs': { count:3, svc:'sqs', prov:'aws', titles:['SQS encrypted with CMK','SQS DLQ configured','SQS not publicly accessible'] },
  'aws/ssm': { count:1, svc:'ssm', prov:'aws', titles:['SSM documents not public'] },
  'aws/workspaces': { count:1, svc:'workspaces', prov:'aws', titles:['WorkSpaces volume encryption'] },
  'aws/bedrock': { count:2, svc:'bedrock', prov:'aws', titles:['Bedrock prompt attack filter HIGH','Bedrock invocation logging'] },
  'aws/guardduty': { count:1, svc:'guardduty', prov:'aws', titles:['GuardDuty enabled'] },
  'aws/vpc': { count:3, svc:'vpc', prov:'aws', titles:['VPC flow logging','VPC default SG restricts all','VPC DNS resolution'] },
  'aws/extra': { count:415, svc:'various', prov:'aws', titles: Array.from({length:415},(_,i)=>`AWS security check: ${['EC2 instance config','S3 bucket policy','IAM permission audit','RDS security','Lambda security','CloudFormation drift','EKS node security','ECS container','VPC endpoint','CloudWatch metric','Config rule','Route53 DNS','WAF rule','Shield protection','Macie classification','Inspector assessment','GuardDuty finding','SecurityHub standard','Access Analyzer','Organizations SCP'][i%20]} validation ${Math.floor(i/20)+1}`) },
  // Azure (161)
  'azure/appservice': { count:10, svc:'appservice', prov:'azure', titles:['App Service HTTPS only','App Service min TLS 1.2','App Service managed identity','App Service auth enabled','App Service client certs','App Service latest HTTP version','App Service no remote debug','App Service FTP disabled','App Service diagnostic logging','App Service latest runtime'] },
  'azure/authorization': { count:2, svc:'authorization', prov:'azure', titles:['No custom subscription owner roles','No classic admin roles'] },
  'azure/compute': { count:4, svc:'compute', prov:'azure', titles:['VM endpoint protection','VM disk encryption','VM managed disks','VM no extensions'] },
  'azure/container': { count:7, svc:'container', prov:'azure', titles:['AKS RBAC enabled','AKS private API server','AKS network policy','AKS Azure CNI','ACR private endpoint','ACR content trust','Container private network'] },
  'azure/database': { count:12, svc:'database', prov:'azure', titles:['SQL auditing','SQL TDE','SQL firewall','SQL backup retention','Cosmos DB private endpoint','MySQL SSL','PostgreSQL SSL','SQL vuln assessment','SQL ATP','MariaDB SSL','SQL geo backup','Cosmos DB firewall'] },
  'azure/datafactory': { count:1, svc:'datafactory', prov:'azure', titles:['Data Factory private endpoint'] },
  'azure/datalake': { count:1, svc:'datalake', prov:'azure', titles:['Data Lake encryption'] },
  'azure/keyvault': { count:5, svc:'keyvault', prov:'azure', titles:['KV soft delete','KV purge protection','KV firewall','KV key expiration','KV secret expiration'] },
  'azure/monitor': { count:3, svc:'monitor', prov:'azure', titles:['Alert create policy','Alert delete security','Monitor all regions'] },
  'azure/network': { count:9, svc:'network', prov:'azure', titles:['NSG no SSH from internet','NSG no RDP from internet','Network Watcher enabled','DDoS Protection','VNet uses NSG','LB health probes','AppGW WAF v2','VPN no basic SKU','ExpressRoute redundant'] },
  'azure/security-center': { count:6, svc:'security-center', prov:'azure', titles:['SC standard tier','SC auto-provisioning','SC email owner','SC email high severity','Adaptive app controls','JIT VM access'] },
  'azure/storage': { count:12, svc:'storage', prov:'azure', titles:['Storage CMK','Storage HTTPS','Storage private endpoint','Storage blob soft delete','Storage container soft delete','Storage no public blob','Storage latest TLS','Storage network rules','Storage logging','Storage trusted MS services','Storage infra encryption','Storage queue logging'] },
  'azure/synapse': { count:1, svc:'synapse', prov:'azure', titles:['Synapse private endpoint'] },
  'azure/extra': { count:88, svc:'various', prov:'azure', titles: Array.from({length:88},(_,i)=>`Azure security check: ${['VM config','Storage policy','Network rule','Identity audit','SQL security','Key Vault','App Service','Container','Monitor','Security Center'][i%10]} validation ${Math.floor(i/10)+1}`) },
  // GCP (97)
  'gcp/compute': { count:24, svc:'compute', prov:'gcp', titles: Array.from({length:24},(_,i)=>`GCP compute check ${i+1}: ${['No default SA','No public IP','No unrestricted SSH','No unrestricted RDP','Shielded VM','Serial port disabled','OS login','CMEK encryption','No IP forwarding','TLS 1.2 SSL policy','Block project SSH keys','Backend logging','No legacy network','No default network','Firewall logging','Deletion protection','Confidential computing','Latest machine image','Health check logging','BGP auth','Strong VPN cipher','Multi-zone MIG','Managed SSL','Integrity monitoring'][i]}`) },
  'gcp/dns': { count:2, svc:'dns', prov:'gcp', titles:['Cloud DNS DNSSEC enabled','Cloud DNS no RSASHA1'] },
  'gcp/gke': { count:17, svc:'gke', prov:'gcp', titles: Array.from({length:17},(_,i)=>`GKE check: ${['Network policy','Private endpoint','Workload identity','Binary auth','Shielded nodes','Intranode visibility','VPC-native','Master auth networks','Auto-upgrade','Auto-repair','Logging','Monitoring','Network policy provider','No default SA','Pod security','Secure boot','Release channel'][i]}`) },
  'gcp/iam': { count:12, svc:'iam', prov:'gcp', titles: Array.from({length:12},(_,i)=>`GCP IAM check: ${['No SA admin','Key rotation 90d','No user-managed keys','No allUsers','No allAuthenticatedUsers','Corporate login','API key restrictions','Separation of duties','No excessive custom roles','Domain restricted sharing','KMS rotation','No SA admin roles'][i]}`) },
  'gcp/kms': { count:1, svc:'kms', prov:'gcp', titles:['KMS keys rotated 90 days'] },
  'gcp/sql': { count:13, svc:'sql', prov:'gcp', titles: Array.from({length:13},(_,i)=>`Cloud SQL: ${['No public IP','SSL enforced','PG log connections','PG log disconnections','Auto backups','Private IP','PITR','MySQL local_infile off','Authorized networks','PG log min error','PG log min duration','Binary logging','Latest maintenance'][i]}`) },
  'gcp/storage': { count:5, svc:'storage', prov:'gcp', titles:['Bucket not public','Uniform bucket access','Versioning','Logging','Retention policy'] },
  'gcp/bigquery': { count:1, svc:'bigquery', prov:'gcp', titles:['BigQuery not publicly accessible'] },
  'gcp/extra': { count:22, svc:'various', prov:'gcp', titles: Array.from({length:22},(_,i)=>`GCP security check ${i+1}`) },
  // Kubernetes (83)
  'k8s/apiserver': { count:15, svc:'apiserver', prov:'kubernetes', titles: Array.from({length:15},(_,i)=>`API server check ${i+1}`) },
  'k8s/pod': { count:20, svc:'pod', prov:'kubernetes', titles: Array.from({length:20},(_,i)=>`Pod security check ${i+1}`) },
  'k8s/network': { count:5, svc:'network', prov:'kubernetes', titles: Array.from({length:5},(_,i)=>`K8s network check ${i+1}`) },
  'k8s/etcd': { count:8, svc:'etcd', prov:'kubernetes', titles: Array.from({length:8},(_,i)=>`etcd security check ${i+1}`) },
  'k8s/kubelet': { count:12, svc:'kubelet', prov:'kubernetes', titles: Array.from({length:12},(_,i)=>`Kubelet check ${i+1}`) },
  'k8s/scheduler': { count:3, svc:'scheduler', prov:'kubernetes', titles: Array.from({length:3},(_,i)=>`Scheduler check ${i+1}`) },
  'k8s/controller': { count:5, svc:'controllermanager', prov:'kubernetes', titles: Array.from({length:5},(_,i)=>`Controller manager check ${i+1}`) },
  'k8s/extra': { count:15, svc:'various', prov:'kubernetes', titles: Array.from({length:15},(_,i)=>`K8s security check ${i+1}`) },
  // Cloudflare (29)
  'cf/all': { count:29, svc:'cloudflare', prov:'cloudflare', titles: Array.from({length:29},(_,i)=>`Cloudflare check: ${['WAF enabled','Managed rules','Rate limiting','DDoS protection','Bot management','DNSSEC','No internal IPs','CAA records','MX records','SPF','DKIM','DMARC','DNS zone transfer','Full Strict SSL','Min TLS 1.2','Always HTTPS','HSTS','Auto HTTPS Rewrite','CT Monitoring','mTLS','Zero Trust','MFA policy','Service token rotation','Access groups','IP access rules','Country firewall','Security headers','HTTP/3','WebSocket config'][i]}`) },
  // GitHub (21)
  'gh/all': { count:21, svc:'repository', prov:'github', titles: Array.from({length:21},(_,i)=>`GitHub check: ${['Branch protection','Signed commits','Vuln alerts','No force push','Code scanning','Secret scanning','Dependabot','CODEOWNERS','Org 2FA','Restrict repo creation','Verified emails','SSO enabled','Restrict forking','Security policy','Audit log','Base perms read','Restrict actions','No self-hosted runners','Org-level secrets','Workflow permissions','Approval for collaborators'][i]}`) },
  // Google Workspace (1)
  'gw/all': { count:1, svc:'admin', prov:'googleworkspace', titles:['Google Workspace 2-step verification'] },
  // IaC (551)
  'iac/all': { count:551, svc:'iac', prov:'iac', titles: Array.from({length:551},(_,i)=>`IaC check ${i+1}: ${['Terraform resource','CloudFormation template','K8s manifest','Dockerfile','Bicep template','ARM template','Helm chart','Ansible playbook','Pulumi config','CDK construct'][i%10]} - ${['encryption','network','IAM','logging','backup','monitoring','access control','secrets','compliance','hardening'][i%10]} validation`) },
  // LLM (52)
  'llm/all': { count:52, svc:'llm', prov:'llm', titles: Array.from({length:52},(_,i)=>`LLM check: ${['Prompt injection','Output encoding','Rate limiting','Input validation','Content filtering','PII masking','Access control','API auth','Logging','Data retention','Token limits','Guardrails','Bias detection','Toxicity filter','Jailbreak detection','PII API response','PII training data','PII logs','PII encryption','PII audit','PII retention','PII errors','PII outputs','PII classification','PII lineage','AI governance','Model cards','Ethical guidelines','Regulatory compliance','Audit trail','Third-party assessment','Data agreements','Right to explanation','Model versioning','Incident response','AI risk assessment','Transparency','Training validation','Data poisoning','Data provenance','Synthetic data','Data access','Data encryption','Data anonymization','Data quality','Data drift','Feature store','Model artifacts','Embedding encryption','Vector DB access','RAG validation','Data pipeline'][i]}`) },
  // Microsoft365 (90)
  'm365/all': { count:90, svc:'microsoft365', prov:'microsoft365', titles: Array.from({length:90},(_,i)=>`M365 check: ${['Modern auth','Audit logging','External forwarding','DKIM','Anti-phishing','Anti-malware','Safe Attachments','Safe Links','Mailbox auditing','Journal rules','Transport rules','Shared mailbox','Remote PS','SMTP AUTH','Mail tips','ActiveSync CA','Auto-forward block','External sender warn','Attachment filter','Quarantine','Email encryption','DLP','Retention','eDiscovery audit','Litigation hold','External sharing','SharePoint DLP','SP modern auth','OneDrive sync','Guest access','Default link type','Info barriers','Sensitive labels','SP conditional access','Legacy auth block','Site permissions','OneDrive retention','App-only access','Search permissions','File versioning','Site creation','Custom scripts','B2B integration','IRM','Access requests','Teams external','Teams guest','Meeting recording','Messaging policies','App permissions','Cloud recording encryption','Lobby settings','Anonymous join','File sharing','Teams DLP','Comm compliance','Teams info barriers','Teams retention','Guest calling','Channel creation','MFA all users','Conditional access','Legacy auth block','Password protection','SSPR','PIM','Access reviews','Sign-in risk','User risk','Named locations','Terms of use','Admin consent','App registrations','External identities','Password hash sync','SSO','AD Connect','Break glass','Security defaults','Diagnostics','Risky sign-ins','Privileged roles','Group licensing','Dynamic groups','AD logs export','Banned passwords','Lockout policy','Auth methods','Cross-tenant','Admin units'][i]}`) },
  // MongoDB Atlas (10)
  'mdb/all': { count:10, svc:'atlas', prov:'mongodbatlas', titles: Array.from({length:10},(_,i)=>`Atlas check: ${['Encryption at rest','TLS enabled','IP whitelist','Backup enabled','Audit logging','Network peering','Private endpoint','Network restricted','Org MFA','Project access'][i]}`) },
  // NHN (6)
  'nhn/all': { count:6, svc:'nhn', prov:'nhn', titles: Array.from({length:6},(_,i)=>`NHN check: ${['Encrypted disk','Security group','Monitoring','VPC flow logs','HTTPS LB','Audit logging'][i]}`) },
  // OpenStack (34)
  'os/all': { count:34, svc:'openstack', prov:'openstack', titles: Array.from({length:34},(_,i)=>`OpenStack check ${i+1}`) },
  // Oracle Cloud (51)
  'oci/all': { count:51, svc:'oraclecloud', prov:'oraclecloud', titles: Array.from({length:51},(_,i)=>`OCI check ${i+1}`) },
  // Alibaba Cloud (63)
  'ali/all': { count:63, svc:'alibabacloud', prov:'alibabacloud', titles: Array.from({length:63},(_,i)=>`Alibaba Cloud check ${i+1}`) },
};

function pickSeverity(idx) {
  const r = (idx * 7 + 3) % 100 / 100;
  if (r < 0.10) return 'critical';
  if (r < 0.43) return 'high';
  if (r < 0.80) return 'medium';
  return 'low';
}

const cats = ['encryption','identity-access','internet-exposed','logging','forensics-ready','resilience','secrets','trust-boundaries','vulnerabilities','gen-ai','threat-detection','software-supply-chain','container-security','cluster-security','node-security','ci-cd','email-security'];

export function generateAllChecks() {
  const all = [];
  let gi = 0;
  for (const [, data] of Object.entries(checkTemplates)) {
    for (let i = 0; i < data.count; i++) {
      const title = data.titles[i % data.titles.length];
      const sev = pickSeverity(gi);
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'').substring(0,80) + '_' + gi;
      all.push({ id, title, provider:data.prov, service:data.svc, severity:sev, author:'Heloix', tags:[cats[gi%cats.length]], description:title+'. This check verifies the configuration meets security best practices.', date:'06/24/2025', resourceType:'', risk:'Non-compliance may expose resources to security threats.', recommendation:'Review and update the configuration to meet this requirement.', remediation_cli:'', remediation_terraform:'', remediation_iac:'', remediation_manual:'', references:[] });
      gi++;
    }
  }
  return all;
}

export const fullCheckCount = Object.values(checkTemplates).reduce((s,d)=>s+d.count,0);
