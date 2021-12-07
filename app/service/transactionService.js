import Transaction from '../model/transaction.js';
import TransactionDetail from '../model/transactionDetail.js';
import Sequelize from 'sequelize';
import db from '../config/database.js'

export const create = async (req, res, next) => {
    console.log('Start execute create new transaction');

    let t;

    // Get request body
    const request = req.body;
    console.log('Request::: ' + JSON.stringify(request));

    try {
        // define managed transaction
        t = await db.transaction();

        const transaction = await Transaction.create({
            transactionRefNumber: request.transactionRefNumber,
            transactionDate: Date.now(),
            customerName: request.customerName,
            cost: request.cost,
            shippingCost: request.shippingCost
        }, {
            transaction: t
        });
        console.log('Transaction:: ' + transaction);

        for (let i = 0; i < request.details.length; i++) {
            const detail = request.details[i];
            await TransactionDetail.create({
                transactionId: transaction.id,
                stuff: detail.stuff,
                price: detail.price,
                qty: detail.qty,
                total: detail.total,
            }, {
                transaction: t
            });
        }

        // Commit managed transaction
        await t.commit();
        res.send(transaction);
    } catch(err) {
        // Rollback managed transaction
        await t.rollback();

        console.log('Happened error when save transaction data. ', err);
        res.status(500).send({
            message: err.message
        })
    }
    console.log('End execute create new transaction');
}

export const getAll = async (req, res, next) => {
    console.log('Start execute find all transaction');
    const transactions = await Transaction.findAll();
    res.send(transactions);
    console.log('End execute find all transaction');
}

export const search = async (req, res, next) => {
    console.log('Start execute search transaction by parameter');
    console.log('Search Request:: ' + JSON.stringify(req.body));
    const transaction = await Transaction.findAll({
        where: {
            transactionRefNumber: {
                [Sequelize.Op.like]: '%' + req.body.transactionRefNumber + '%'
            },
            customerName: {
                [Sequelize.Op.like]: '%' + req.body.customerName + '%'
            }
        }
    });
    res.send(transaction);
    console.log('End execute search transaction by parameter');
}