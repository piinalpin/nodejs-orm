import Sequelize from 'sequelize';
import db from '../config/database.js';

const Transaction = db.define('transaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: db.Sequelize.literal("nextval('id_transaction_seq')")
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    transactionRefNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    transactionDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    customerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cost: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    shippingCost: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'transaction',
    underscored: true
});

export default Transaction;