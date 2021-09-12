import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Flex,
  Heading,
  Text,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Select,
  Switch,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import AccountContext from "../context/AccountContext";
import { FirebaseContext } from "../firebase";
import UserContext from "../context/UserContext";

const Home = () => {
  const { account } = useContext(AccountContext);
  const { user } = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseType, setExpenseType] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [roundExpenses, setRoundExpenses] = useState(
    account && account.roundExpenses
  );
  console.log(account);

  const submitExpense = async () => {
    try {
      const higher = Math.ceil(expenseAmount);
      await firebase.submitExpense(
        account.accountID,
        expenseAmount,
        expenseType,
        expenseName,
        Number((higher - expenseAmount).toFixed(2)),
        user.user.uid,
        Number(account.savedThisMonth),
      );
      setIsExpenseModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (account) {
      setRoundExpenses(account.roundExpenses);
    }
  }, [account]);

  return (
    <>
      <Navbar />
      <Flex justify="center" align="center" direction="column" mt={6} mb={4}>
        <Box>
          <Text>Current Balance</Text>
        </Box>
        <Box>
          <Heading size="md">
            {account && Object.keys(account) !== 0
              ? account.currentBalance
              : "-"}
          </Heading>
        </Box>
      </Flex>
      <Flex justify="space-evenly" align="center">
        <Flex direction="column" justify="center" align="center">
          <Text>
            {account && Object.keys(account) !== 0
              ? account.spentThisMonth
              : "-"}
          </Text>
          <Flex justify="center" align="center">
            <FontAwesomeIcon icon={["fas", "arrow-up"]} />
            <Text ml={2}>Spent</Text>
          </Flex>
        </Flex>
        <Flex direction="column" justify="center" align="center">
          <Text>
            {account && Object.keys(account) !== 0
              ? account.savedThisMonth
              : "-"}
          </Text>
          <Flex justify="center" align="center">
            <FontAwesomeIcon icon={["fas", "arrow-down"]} />
            <Text ml={2}>Saved</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex px={4} my={4} w="100%">
        <Button
          flex={1}
          bg="teal"
          onClick={() => setIsExpenseModalOpen(!isExpenseModalOpen)}
        >
          Add An Expense
        </Button>
      </Flex>
      <Flex px={4} my={4} w="100%">
        <Button flex={1}>Setup a Goal</Button>
      </Flex>
      <Flex align="start" p={4} direction="column">
        <Heading size="sm" mb={2}>
          SAVING STRATEGIES
        </Heading>
        <Box bg="gray.500" h={20} w="100%" borderRadius={4} p={4} mb={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="round-expenses" mb="0">
              Round up my expenses
            </FormLabel>
            <Switch
              id="round-expenses"
              colorScheme="teal"
              borderColor="black"
              isChecked={roundExpenses}
              onChange={async (event) => {
                await firebase.updateProfile(user.user.uid, {
                  roundExpenses: event.target.checked,
                });
                setRoundExpenses(event.target.checked);
              }}
            />
          </FormControl>
        </Box>
        <Box bg="gray.500" h={20} w="100%" borderRadius={4} p={4} mb={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="52-week" mb="0">
              52 Week Challenge
            </FormLabel>
            <Switch id="52-week" colorScheme="teal" borderColor="black" />
          </FormControl>
        </Box>
        <Box bg="gray.500" h={20} w="100%" borderRadius={4} p={4} mb={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="money-aside" mb="0">
              Put aside money when you get paid
            </FormLabel>
            <Switch id="money-aside" colorScheme="teal" borderColor="black" />
          </FormControl>
        </Box>
      </Flex>
      <Flex align="start" p={4} direction="column">
        <Heading size="sm" mb={2}>
          SAVE FOR FUN
        </Heading>
        <Box bg="gray.500" h={20} w="100%" borderRadius={4} p={4} mb={4}>
          <Text color="white">Find Food Recipes</Text>
        </Box>
      </Flex>
      <Modal isOpen={isExpenseModalOpen} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add an Expense</ModalHeader>
          <Box position="fixed" alignSelf="end">
            <Button onClick={() => setIsExpenseModalOpen(!isExpenseModalOpen)}>
              X
            </Button>
          </Box>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Expense Type</FormLabel>
              <Select
                placeholder="Select an option"
                onChange={(event) => setExpenseType(event.target.value)}
                value={expenseType}
              >
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Utilities">Utilities</option>
                <option value="Insurance">Insurance</option>
                <option value="Health">Health</option>
                <option value="Investment">Investment</option>
                <option value="Personal">Personal</option>
                <option value="Recreation">Recreation</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Merchant Name</FormLabel>
              <Input
                placeholder="Enter a merchant"
                value={expenseName}
                onChange={(event) => setExpenseName(event.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="Enter an amount"
                value={expenseAmount}
                onChange={(event) => setExpenseAmount(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitExpense}>
              Save
            </Button>
            <Button onClick={() => setIsExpenseModalOpen(!isExpenseModalOpen)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box h={30} />
    </>
  );
};

export default Home;
