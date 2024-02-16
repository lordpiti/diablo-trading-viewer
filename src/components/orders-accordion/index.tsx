import { Box, Chip, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { ChangeEvent, useState } from "react";

import { Order } from "@/types/types";
import { formatDate } from "@/utils/formatters";

const styles = {
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    margin: "auto !important",
  },
  heading: {
    fontSize: 23,
    fontWeight: "bold",
    padding: "10px",
  },
  details: {
    padding: 0,
    display: "inline-block",
    width: "100%",
  },
  summary: {
    backgroundColor: "rgba(0, 0, 0, .03) !important",
    borderBottom: "1px solid rgba(0, 0, 0, .125) !important",
    marginBottom: -1,
    minHeight: 56,
  },
  noOrders: {
    paddingBottom: "20px",
  },
};

const createOrderPopoverContent = (order: Order) => (
  <>
    <p>Change: {order.value}</p>
    <p>Crypto quantity: {order.quantityCrypto}</p>
    <p>USDT quantity: {order.quantityMoney}</p>
    <p>USDT after order: {order.moneyAfterOrder}</p>
  </>
);

const OrdersAccordion = (props: { orders: Order[] }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const { orders } = props;
  const handleChange =
    (panel: string) => (event: ChangeEvent<{}>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Box sx={styles.heading}>Orders</Box>
      {(!orders || !orders.length) && (
        <Box sx={styles.noOrders}>No orders sent</Box>
      )}

      {orders &&
        orders.map((order, index: number) => (
          <Accordion
            key={`accordion-${index}`}
            sx={{ root: styles.root }}
            square
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              sx={styles.summary}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Grid direction="row" justifyContent="space-between" container>
                <Grid item>{formatDate(order.timeStamp)}</Grid>
                <Grid item>
                  <Chip
                    label={order.isBuy ? "BUY" : "SELL"}
                    color={order.isBuy ? "warning" : "success"}
                  />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={styles.details}>
              {createOrderPopoverContent(order)}
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default OrdersAccordion;
