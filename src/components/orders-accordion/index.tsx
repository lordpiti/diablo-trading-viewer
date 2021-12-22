import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Chip, Grid, Paper } from '@material-ui/core';
import { formatDate } from '../../utils/formatters';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const createOrderPopoverContent = (order: any) => (
  <>
    <p>Change: {order.value}</p>
    <p>Crypto quantity: {order.quantityCrypto}</p>
    <p>USDT quantity: {order.quantityMoney}</p>
    <p>USDT after order: {order.moneyAfterOrder}</p>
  </>
);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    display: 'inline-block',
    width: '100%',
  },
}))(MuiAccordionDetails);

const CustomizedAccordions = (props: any) => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const { orders } = props;
  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Paper>
      Orders
      {orders.map((order: any, index: number) => (
        <Accordion
          square
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
            <Grid direction='row' justifyContent='space-between' container>
              <Grid item>{formatDate(order.timeStamp)}</Grid>
              <Grid item>
                <Chip
                  label={order.isBuy ? 'BUY' : 'SELL'}
                  color={order.isBuy ? 'primary' : 'secondary'}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            {createOrderPopoverContent(order)}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default CustomizedAccordions;
