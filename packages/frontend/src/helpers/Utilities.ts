import { TransactionReceipt } from "@ethersproject/providers";

export const shorterAddress = (str: string | null | undefined) => str && str.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str;

export const pollingTransaction = (hash: string, txCompletedCallBack: Function, provider: any) => {

  const pollingInterval = setInterval(() => {
    provider.getTransactionReceipt(hash)
      .then((transactionReceipt: TransactionReceipt) => {
        if (transactionReceipt?.status === 0 || transactionReceipt?.status === 1) {
          clearInterval(pollingInterval);
          txCompletedCallBack(transactionReceipt?.status);
        }
      });
  }, 3000);
}

export const errorHandler = (err: any, setSnackbar: Function) => {
  if (err && err.data && err.data.message) {
    setSnackbar({
      isOpen: true,
      timeOut: 60000,
      type: 'error',
      message: err.data.message
    });
  } else if (err && err.error && err.error.message) {
    setSnackbar({
      isOpen: true,
      timeOut: 60000,
      type: 'error',
      message: err.error.message
    });
  } else if (err && err.message) {
    setSnackbar({
      isOpen: true,
      timeOut: 60000,
      type: 'error',
      message: err.message.split(',') && err.message.split(',')[0] ? err.message.split(',')[0] + ')' : err.message
    });
  } else {
    setSnackbar({
      isOpen: true,
      timeOut: 60000,
      type: 'error',
      message: 'Something went wrong, please try again later.'
    });
  }
}