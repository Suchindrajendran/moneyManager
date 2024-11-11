// Write your code here

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props
  const {id, title, type, amount} = transactionDetails

  const deleteImgUrl =
    'https://assets.ccbp.in/frontend/react-js/money-manager/delete.png'

  const onClickDeleteBtn = () => {
    onDeleteTransaction(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>Rs. {amount}</p>
      <p>{type}</p>
      <button type="button" onClick={onClickDeleteBtn} data-testid="delete">
        <img src={deleteImgUrl} alt="delete" />
      </button>
    </li>
  )
}

export default TransactionItem
