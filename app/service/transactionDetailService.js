import db from '../config/database.js'
import TransactionDetail from '../model/transactionDetail.js';
import Sequelize from 'sequelize';

export const search = async (req, res, next) => {
    console.log('Start execute search transaction detail by parameter');
    console.log('Search Request:: ' + JSON.stringify(req.body));
    const transaction = await TransactionDetail.findAll({
        where: {
            [Sequelize.Op.and]: [
                {
                    stuff: {
                        [Sequelize.Op.like]: '%' + req.body.stuff + '%'
                    }
                },
                Sequelize.where(
                    Sequelize.cast(Sequelize.col('transaction_detail.transaction_id'), 'varchar'),
                    {
                        [Sequelize.Op.iLike]: '%' + req.body.transactionId + '%'
                    }
                )
            ]
        }
    });
    res.send(transaction);
    console.log('End execute search transaction detail by parameter');
}

export const update = async (req, res, next) => {
    console.log('Start execute update transaction detail');
    console.log('Transaction detail update Request:: ' + JSON.stringify(req.body));

    let t;

    console.log('Find transaction detail by id:: ' + req.params.id);
    const detail = await TransactionDetail.findByPk(req.params.id);

    if (null == detail) {
        console.log('Data transaction detail not found, cancel update data');
        res.send({message: 'transaction detail: not found'});
        return;
    }

    try {
        t = await db.transaction();

        const detailToUpdate = {
            qty: req.body.qty,
            total: parseInt(detail.total) * req.body.qty
        }

        await TransactionDetail.update(detailToUpdate, {
            where: {
                id: req.params.id
            }
        });

        await t.commit();
        res.send({message: 'success'});
    } catch(err) {
        await t.rollback();
        console.log('Happened error when updating transaction detail');
        res.status(500).send({
            message: err.message
        })
    }
    console.log('End execute update transaction detail');
}

export const deleteById = async(req, res, next) => {
    console.log('Start execute delete transaction detail by id');

    let t;

    console.log('Find transaction detail by id:: ' + req.params.id);
    const detail = await TransactionDetail.findByPk(req.params.id);

    if (null == detail) {
        console.log('Data transaction detail not found, cancel update data');
        res.send({message: 'transaction detail: not found'});
        return;
    }

    try {
        t = await db.transaction();

        await TransactionDetail.destroy({
            where: {
                id: detail.id
            }
        });

        await t.commit();
        res.send({message: 'success'});
    } catch(err) {
        await t.rollback();
        console.log('Happened error when deleting transaction detail');
        res.status(500).send({
            message: err.message
        })
    }
    console.log('End execute delete transaction detail by id');
}