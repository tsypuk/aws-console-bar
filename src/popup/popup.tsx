import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import AccountCard from "./AccountCard"
import './popup.css'
import {AWSAccount, getAccounts} from "../utils/api";
import AccountGraph from "./AccountGraph";
import AWSAccountsAppBar from "./AWSAppBar/AWSAccountsAppBar";

const App: React.FC<{}> = () => {
    const [accounts, setAccounts] = useState<AWSAccount[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAccounts();
            setAccounts(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <AWSAccountsAppBar/>
            <section>
                <h2>Data</h2>
                {accounts.map((account) => (
                    <AccountCard key={account.accountID} awsAccount={account}/>
                ))}
            </section>
            <section>
                <AccountGraph></AccountGraph>
            </section>
        </div>
    )

};

const rootEl = document.createElement("div");
document.body.appendChild(rootEl);
ReactDOM.render(<App/>, rootEl)
