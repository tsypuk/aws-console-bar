import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import AccountCard from "./AccountCard"
import './popup.css'
import {AWSAccount, getAccounts} from "../utils/api";
import AccountGraph from "./AccountGraph";

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

// return (
//     <div>
//         <h1>Available AWS accounts</h1>
//         <AccountCard name="1111-2222-2222"/>
//         <AccountCard name="2222-2222-2222"/>
//     </div>
// );
// }

const rootEl = document.createElement("div");
document.body.appendChild(rootEl);
ReactDOM.render(<App/>, rootEl)
