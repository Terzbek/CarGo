'use client';

declare global {
  interface Window {
    ethereum?: any;
  }
}


import { FC, useEffect, useState } from "react";
import { BadgeDollarSign, Wallet as WalletIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // убедись, что у тебя есть этот компонент

export const Wallet: FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setError(null);
      } catch (err) {
        setError("Пользователь отклонил подключение.");
      }
    } else {
      setError("MetaMask не установлен.");
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });
    }
  }, []);

  return (
    <Card className="shadow-md border">
      <CardContent className="space-y-6 pt-8 px-6 pb-10">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <WalletIcon size={24} /> Кошелек
          </h2>
          {walletAddress ? (
            <div className="text-green-600">
              Подключен: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          ) : (
            <Button onClick={connectWallet}>
              Подключить MetaMask
            </Button>
          )}
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <BadgeDollarSign size={18} />
          Баланс, история транзакций — скоро будет доступно
        </div>
      </CardContent>
    </Card>
  );
};
