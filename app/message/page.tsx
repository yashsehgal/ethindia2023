"use client";
import { CardContainer, FormItemWrapper, Input, Section, ViewContainer, Label, Button } from "@/components"
import { cn } from "@/helpers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useRef, useState } from "react";
import { recoverMessageAddress } from "viem";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

const MessageView: React.FunctionComponent = () => {
  const { isConnected, address } = useAccount()
  console.log("address", address);
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      <Section className="w-[60%] mx-auto">
        <div className="flex flex-row items-center justify-between">
          <h1 className="leading-snug tracking-tight font-semibold text-5xl">
            {"Send a message"}
          </h1>
          <ConnectButton />
        </div>
        <Section>
          <CardContainer className={cn("gap-4", isConnected ? "grid" : "flex flex-row items-center justify-center")}>
            {isConnected && <MessageBox />}
            {!isConnected && <div className="w-full border-dashed border-2 border-gray-200/60 rounded-xl p-12 flex flex-row items-center justify-center">
              <ConnectButton />
            </div>}
          </CardContainer>
        </Section>
      </Section>
    </>
  )
}

const MessageBox: React.FunctionComponent = () => {
  const [recoveredAddress, setRecoveredAddress] = useState<string>("");
  const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage();

  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    ; (async () => {
      if (variables?.message && signMessageData) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        })
        setRecoveredAddress(recoveredAddress)
      }
    })()
  }, [signMessageData, variables?.message])

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        signMessage({ message: message as string })
      }}
    >
      <FormItemWrapper>
        <Label>
          Your name
        </Label>
        <Input
          placeholder="Tony Stark"
        />
      </FormItemWrapper>
      <FormItemWrapper>
        <Label>Your message</Label>
        <textarea
          placeholder="Write a message to send"
          className={cn(
            "w-full rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white px-6 py-6 text-lg ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            "resize-none h-[160px]"
          )}
          onChange={(event) => setMessage(event.target.value as string)}
          value={message}
        />
      </FormItemWrapper>
      <Button
        size="large"
        type="submit"
        stretch
        className="p-6 text-xl"
        disabled={isLoading}
      >
        {!isLoading ? "Send message" : "Opening wallet for signing..."}
      </Button>
    </form>
  )
}

export default MessageView;