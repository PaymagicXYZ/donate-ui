import { WalletChecker } from "../WalletChecker";
import { ApprovalForm } from "./ApprovalForm";
export function CleanWallet(props) {
  const { covalentData, account } = props;
  return (
    <WalletChecker loading={covalentData.loading} account={account}>
      <ApprovalForm {...{ covalentData }} />
    </WalletChecker>
  );
}
