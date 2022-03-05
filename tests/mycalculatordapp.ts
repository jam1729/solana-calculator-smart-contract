const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('mycalculatordapp', () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  const calculator_account_keypair = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mycalculatordapp;

  it('Creates a calculator', async () => {
    await program.rpc.create("Welcome to Solana Samosa", {
      accounts: {
        calculator: calculator_account_keypair.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,  
      },
      signers: [calculator_account_keypair]
    })

    const calculator_account = await program.account.calculator.fetch(calculator_account_keypair.publicKey);
    assert.ok(calculator_account.greeting == "Welcome to Solana Samosa");
    _calculator_account_keypair = calculator_account_keypair;
  });

  it("Adds two numbers", async function() {
    const calculator_account_keypair = _calculator_account_keypair;

    await program.rpc.add(new anchor.BN(2), new anchor.BN(3),{
      accounts: {
        calculator: calculator_account_keypair.publicKey,
      }
    })

    const calculator_account = await program.account.calculator.fetch(calculator_account_keypair.publicKey);
    assert.ok(calculator_account.result.eq(new anchor.BN(5)));
  });

  it('Multiplies two numbers', async function() {
    const calculator_account_keypair = _calculator_account_keypair;

    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3),{
      accounts: {
        calculator: calculator_account_keypair.publicKey,
      }
    })

    const calculator_account = await program.account.calculator.fetch(calculator_account_keypair.publicKey);
    assert.ok(calculator_account.result.eq(new anchor.BN(6)));
  })

  it('Subtracts two numbers', async function() {
    const calculator_account_keypair = _calculator_account_keypair;

    await program.rpc.subtract(new anchor.BN(2), new anchor.BN(3),{
      accounts: {
        calculator: calculator_account_keypair.publicKey,
      }
    })

    const calculator_account = await program.account.calculator.fetch(calculator_account_keypair.publicKey);
    assert.ok(calculator_account.result.eq(new anchor.BN(-1)));
  });

  it('Divides two numbers', async function() {
    const calculator_account_keypair = _calculator_account_keypair;

    await program.rpc.divide(new anchor.BN(2), new anchor.BN(3),{
      accounts: {
        calculator: calculator_account_keypair.publicKey,
      }
    })

    const calculator_account = await program.account.calculator.fetch(calculator_account_keypair.publicKey);
    assert.ok(calculator_account.result.eq(new anchor.BN(0)));
    assert.ok(calculator_account.reminder.eq(new anchor.BN(2)));
    assert.ok(calculator_account.greeting === "Welcome to Solana Samosa");
  });
});