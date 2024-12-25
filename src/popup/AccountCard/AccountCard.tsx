import React from 'react';
import {Card, Box, CardContent} from '@material-ui/core';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import {AWSAccount} from "../../utils/api";

const AccountCard: React.FC<{
    awsAccount: AWSAccount
}> = ({awsAccount}) => {
    return (
        <Box mx={'2px'} my={'2px'}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{awsAccount.accountID}</Typography>
                    <Typography variant="body2" color="text.secondary">{awsAccount.name}</Typography>
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
