import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  onDeleteTransaction = id => {
    const {transactionList} = this.state

    const filteredTransactions = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({
      transactionList: filteredTransactions,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {title, optionId, amount, transactionList} = this.state

    const type = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = type

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }

    this.setState(prevState => ({
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
      transactionList: [...prevState.transactionList, newTransaction],
    }))
  }

  onChangeOptionId = event => {
    this.setState({
      optionId: event.target.value,
    })
  }

  onChangeAmountValue = event => {
    this.setState({
      amount: event.target.value,
    })
  }

  onChangeTitleValue = event => {
    this.setState({
      title: event.target.value,
    })
  }

  getExpenses = () => {
    const {transactionList} = this.state

    let expenseAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTransaction.amount
      }
    })

    return expenseAmount
  }

  getIncome = () => {
    const {transactionList} = this.state

    let incomeAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state

    let balanceAmount = 0
    let incomeAmount = 0
    let expenseAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expenseAmount += eachTransaction.amount
      }
      balanceAmount = incomeAmount - expenseAmount
    })
    return balanceAmount
  }

  render() {
    const {title, amount, optionId, transactionList} = this.state

    const balance = this.getBalance()
    const income = this.getIncome()
    const expenses = this.getExpenses()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="profile-container">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balance}
            incomeAmount={income}
            expenseAmount={expenses}
          />
          <div className="transaction-details-container">
            <div className="transaction-details">
              <h1>Add Transaction</h1>
              <form onSubmit={this.onAddTransaction}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="TITLE"
                  value={title}
                  onChange={this.onChangeTitleValue}
                />
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  id="amount"
                  placeholder="AMOUNT"
                  value={amount}
                  onChange={this.onChangeAmountValue}
                />
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  onChange={this.onChangeOptionId}
                  value={optionId}
                >
                  {transactionTypeOptions.map(eachType => (
                    <option key={eachType.optionId} value={eachType.optionId}>
                      {eachType.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit">Add</button>
              </form>
            </div>
            <div className="transaction-history">
              <h1>History</h1>
              <div>
                <ul>
                  <li>
                    <p>Title</p>
                    <p>Amount</p>
                    <p>Type</p>
                  </li>
                  {transactionList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      onDeleteTransaction={this.onDeleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
