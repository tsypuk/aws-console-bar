import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import AccountCard from "./AccountCard"
import './popup.css'
import {AWSAccount, getAccounts} from "../utils/api";
import AccountGraph from "./AccountGraph";
import AWSAccountsAppBar from "./AWSAppBar/AWSAccountsAppBar";

const App: React.FC<{}> = () => {
    const initialState = {
        // Define your initial state here
    };
    const [accounts, setAccounts] = useState<AWSAccount[]>([]);
    const fetchData = async (accountPattern: string) => {
        const data = await getAccounts(accountPattern);
        setAccounts([])
        setAccounts(data);
        console.log(data);
    };

    useEffect(() => {
        fetchData('');
    }, []);

    return (
        <div>
            <section>
                <AWSAccountsAppBar onClick={fetchData}></AWSAccountsAppBar>
            </section>
            <section>
                <h2>Data</h2>
                {accounts.map((account) => (
                    <AccountCard key={account.accountID} awsAccount={account}/>
                ))}
            </section>
            <section>
                <AccountGraph/>
            </section>
        </div>
    )
};

const rootEl = document.createElement("div");
document.body.appendChild(rootEl);
ReactDOM.render(<App/>, rootEl)
