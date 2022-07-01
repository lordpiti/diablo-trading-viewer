import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Chip, Grid, Paper } from '@material-ui/core';
import { formatDate } from '../../utils/formatters';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(23),
    // fontWeight: theme.typography.fontWeightBold,
    padding: '10px',
  },
  content: {
    display: 'inline-block',
    width: '100%',
  },
  summary: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
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
  const classes = useStyles();

  const { orders } = props;

  return (
    <Paper>
      <div className={classes.root}>
        <div className={classes.heading}>Orders</div>
        {orders.map((order: any) => (
          <Accordion>
            <AccordionSummary
              className={classes.summary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
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
            <AccordionDetails>
              <div className={classes.content}>
                {createOrderPopoverContent(order)}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Paper>
  );
};

export default OrdersAccordion;
