// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expenseAmount} = props

  const balanceImgUrl =
    'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'
  const incomeImgUrl =
    'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'
  const expensesImgUrl =
    'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'

  return (
    <div className="transaction-items">
      <div className="card-container balance-container">
        <div>
          <img src={balanceImgUrl} alt="balance" className="image" />
        </div>
        <div>
          <p>Your Balance</p>
          <p data-testid="balanceAmount">Rs. {balanceAmount}</p>
        </div>
      </div>
      <div className="income-container">
        <div>
          <img src={incomeImgUrl} alt="income" className="image" />
        </div>
        <div>
          <p>Your Income</p>
          <p data-testid="incomeAmount">Rs. {incomeAmount}</p>
        </div>
      </div>
      <div className="balance-container">
        <div>
          <img src={expensesImgUrl} alt="expenses" className="image" />
        </div>
        <div>
          <p>Your Expenses</p>
          <p data-testid="expensesAmount">Rs. {expenseAmount}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
