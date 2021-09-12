import { useCallback } from "react";
import { Container, Flex, Text, VStack, Box } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { FirebaseContext } from "../firebase";

const colors = {
  Housing: "#003f5c",
  Transportation: "#2f4b7c",
  Food: "#665191",
  Utilities: "#a05195",
  Insurance: "#d45087",
  Health: "#f95d6a",
  Investment: "#ff7c43",
  Personal: "#ffa600",
  Recreation: "#7aa6c2",
};

const Savings = ({ accountId }) => {
  const firebase = useContext(FirebaseContext);
  const [transactions, setTransactions] = useState([]);
  const [pieData, setPieData] = useState([]);

  const fetchTransactions = useCallback(async () => {
    const result = await firebase.fetchTransactions(accountId);
    setTransactions(result);
  }, [firebase, accountId]);

  const parseTransactionData = useCallback(() => {
    const transactionCategory = {};
    const totalTransactions = [];
    transactions.forEach((transaction) =>
      transactionCategory[transaction.category]
        ? (transactionCategory[transaction.category] += transaction.amount)
        : (transactionCategory[transaction.category] = transaction.amount)
    );

    for (const property in transactionCategory) {
      totalTransactions.push({
        title: property,
        value: transactionCategory[property],
        color: colors[property],
      });
    }
    setPieData(totalTransactions);
  }, [transactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    parseTransactionData();
  }, [parseTransactionData])

  return (
    <>
      <Container p={4}>
        <Flex justify="center" align="center">
          <FontAwesomeIcon icon={["fas", "donate"]} size="3x" />
        </Flex>
        <Flex align="center" my={2} direction="column" w="100%">
          <Text>Progress towards your goal</Text>
          <Progress
            hasStripe
            value={64}
            h={5}
            colorScheme="green"
            w="100%"
            rounded={4}
            my={4}
          />
        </Flex>
        <Flex justify="center" align="center" my={2} w="80%" mx="auto">
          <PieChart
            data={pieData}
            label={({ dataEntry }) =>
              `${dataEntry.title} (${dataEntry.percentage.toFixed(1)})`
            }
            labelStyle={(index) => ({
              fill: "#fff",
              fontSize: "5px",
              fontFamily: "sans-serif",
            })}
          />
        </Flex>
        <Flex justify="center" my={4} direction="column">
          <Text my={2}>Your Transaction History</Text>
          <VStack align="stretch" spacing={4}>
            {transactions.length !== 0 &&
              transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.transactionId}
                  merchantName={transaction.merchant}
                  category={transaction.category}
                  amount={`$${transaction.amount}`}
                />
              ))}
          </VStack>
        </Flex>
        <Box h={100} />
      </Container>
    </>
  );
};

const TransactionCard = ({ merchantName, category, amount }) => {
  return (
    <Box bg="gray.500" p={4} rounded={4} w="100%">
      <Flex justify="space-between">
        <Flex direction="column">
          <Text color="white">{merchantName}</Text>
          <Text color="white">{category}</Text>
        </Flex>
        <Text color="white">{amount}</Text>
      </Flex>
    </Box>
  );
};

export default Savings;
