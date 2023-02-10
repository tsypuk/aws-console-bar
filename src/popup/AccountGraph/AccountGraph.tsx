import * as React from 'react';
import {LineChart} from '@mui/x-charts/LineChart';
import {Box, Card, CardContent} from "@material-ui/core";

const sample = [1, 10, 30, 50, 70, 90, 100];

const AccountGraph: React.FC<{}> = () => {
    return (
        <Box mx={'4px'} my={'6px'}>
            <Card>
                <CardContent>
                    <LineChart
                        xAxis={[{data: sample}]}
                        yAxis={[
                            {id: 'linearAxis', scaleType: 'linear'},
                            {id: 'logAxis', scaleType: 'log'},
                        ]}
                        series={[
                            {yAxisKey: 'linearAxis', data: sample, label: 'linear'},
                            {yAxisKey: 'logAxis', data: sample, label: 'log'},
                        ]}
                        leftAxis="linearAxis"
                        rightAxis="logAxis"
                        height={300}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}

export default AccountGraph