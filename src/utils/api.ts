const STORAGE_ALIAS = 'aws_accounts'

export interface AWSAccount {
    accountID: string
    color: string
    name: string
}

export async function getAccounts(): Promise<AWSAccount[]> {
    // return [
    //     { accountID: "1111-1111-1111", name: 'Account 1', color: 'red' },
    //     { accountID: "2222-2222-1111", name: 'Account 22', color: 'blue' },
    // ];
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([STORAGE_ALIAS], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                const awsAccounts: AWSAccount[] = result.aws_accounts || [];
                resolve(awsAccounts);
            }
        });
    });
}