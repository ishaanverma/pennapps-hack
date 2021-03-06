import { useCallback } from "react";
import { Container, Flex, Text, VStack, Box } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Lorem,
} from "@chakra-ui/react";
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
  const [modalOpen, setModalOpen] = useState(false);

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
  }, [parseTransactionData]);

  useEffect(() => {
    if (pieData.length > 0) {
      setModalOpen(true);
    }
  }, [pieData]);

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
            data={pieData ? pieData : []}
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
                  saved={transaction.saved ? transaction.saved : null}
                />
              ))}
          </VStack>
        </Flex>
        <Box h={100} />
      </Container>
      <Modal
        isOpen={modalOpen}
        size="xs"
        onClose={() => setModalOpen(!modalOpen)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Caution ??????</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              It seems like your food expenditure is unusually high. Save more
              by cooking at home!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setModalOpen(!modalOpen)}
            >
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const TransactionCard = ({ merchantName, category, amount, saved }) => {
  return (
    <Box bg="gray.500" p={4} rounded={4} w="100%">
      <Flex justify="space-between">
        <Flex direction="column">
          <Text color="white">{merchantName}</Text>
          <Text color="white">{category}</Text>
        </Flex>
        <Flex direction="column" align="end">
          <Text color="white">{amount}</Text>
          {saved && <Text color="white">You Saved: ${saved}</Text>}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Savings;
