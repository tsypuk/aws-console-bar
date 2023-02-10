import React from 'react';
import {Card, Box, CardContent, Typography} from '@material-ui/core';
import {AWSAccount} from "../../utils/api";

const AccountCard: React.FC<{
    awsAccount: AWSAccount
}> = ({awsAccount}) => {
    return (
        <Box mx={'4px'} my={'6px'}>
            <Card>
                <CardContent>
                    <Typography variant="body2">{awsAccount.name}</Typography>
                    <Typography variant="body2">{awsAccount.accountID}</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default AccountCard
