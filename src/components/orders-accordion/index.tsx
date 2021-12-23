import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Chip, Grid, Paper } from '@material-ui/core';
import { formatDate } from '../../utils/formatters';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    margin: 'auto !important',
  },
  heading: {
    fontSize: theme.typography.pxToRem(23),
    fontWeight: theme.typography.fontWeightBold,
    padding: '10px',
  },
  details: {
    padding: theme.spacing(0),
    display: 'inline-block',
    width: '100%',
  },
  summary: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
  },
}));

const createOrderPopoverContent = (order: any) => (
  <>
    <p>Change: {order.value}</p>
    <p>Crypto quantity: {order.quantityCrypto}</p>
    <p>USDT quantity: {order.quantityMoney}</p>
    <p>USDT after order: {order.moneyAfterOrder}</p>
  </>
);

const OrdersAccordion = (props: any) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { orders } = props;
  const classes = useStyles();
  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Paper>
      <div className={classes.heading}>Orders</div>
      {orders.map((order: any, index: number) => (
        <Accordion
          key={`accordion-${index}`}
          className={classes.root}
          square
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            className={classes.summary}
            aria-controls='panel1d-content'
            id='panel1d-header'
          >
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
          <AccordionDetails className={classes.details}>
            {createOrderPopoverContent(order)}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default OrdersAccordion;
