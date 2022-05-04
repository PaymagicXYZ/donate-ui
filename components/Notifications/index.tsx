import { useEffect, useRef } from "react";
import { useNotifications } from "@usedapp/core";
import { useToast, ToastId } from "@chakra-ui/react";

export default function Notifications() {
  const pendingTxRef = useRef<ToastId>();
  const toast = useToast();
  const { notifications } = useNotifications();

  useEffect(() => {
    for (const notification of notifications) {
      if (notification.type === "transactionStarted") {
        pendingTxRef.current = toast({
          title: "Transaction submitted.",
          description: "Waiting for transaction to be confirmed.",
          status: "info",
          position: "bottom-left",
          duration: null,
        });
      } else if (notification.type === "transactionSucceed") {
        if (pendingTxRef.current) {
          toast.close(pendingTxRef.current);
        }
        toast({
          title: "Transaction confirmed.",
          description: "Your donation was sent successfully.",
          status: "success",
          position: "bottom-left",
        });
      }
    }
  }, [notifications, toast]);

  return <></>;
}
