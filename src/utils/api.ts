const STORAGE_ALIAS = 'aws_accounts'

export interface AWSAccount {
    accountID: string
    color: string
    name: string
}

export async function getAccounts(accountPattern: string): Promise<AWSAccount[]> {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([STORAGE_ALIAS], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                let awsAccounts: AWSAccount[];
                if (accountPattern === '' || accountPattern === undefined) {
                    awsAccounts = (result.aws_accounts || [])
                } else {
                    awsAccounts = (result.aws_accounts || [])
                        .filter(
                            (account => account.name.toLowerCase().includes(accountPattern.toLowerCase()))
                            // (account => account.accountID.toLowerCase().includes(accountPattern.toLowerCase()))
                        );
                }
                resolve(awsAccounts);
            }
        });
    });
}
