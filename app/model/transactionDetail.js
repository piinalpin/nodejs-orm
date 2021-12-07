import Sequelize from 'sequelize';
import db from '../config/database.js';
import Transaction from './transaction.js';

const TransactionDetail = db.define('transaction_detail', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: db.Sequelize.literal("nextval('id_transaction_detail_seq')")
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
    transactionId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'transaction', // 'transaction' refer to table name
            key: 'id'
        }
    },
    stuff: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    qty: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    total: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'transaction_detail',
    underscored: true
});

TransactionDetail.belongsTo(Transaction, { as: 'transaction', foreignKey: 'transactionId', targetKey: 'id' });
export default TransactionDetail;