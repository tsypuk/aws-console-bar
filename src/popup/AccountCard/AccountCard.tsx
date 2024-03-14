import React from 'react';
import {Card, Box, CardContent} from '@material-ui/core';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import {AWSAccount} from "../../utils/api";

const AccountCard: React.FC<{
    awsAccount: AWSAccount
}> = ({awsAccount}) => {
    return (
        <Box mx={'4px'} my={'6px'}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{awsAccount.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{awsAccount.accountID}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">Share</Button>
                    <Button size="small" color="primary">Update</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default AccountCard
