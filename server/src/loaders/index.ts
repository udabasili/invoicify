import { Application } from "express"
import db from "@/models"
import expressLoader  from "./express"
import Logger from "./logger"

export default async ({
    app
} : 
{
    app: Application
}) => {

    const User = db.user
    const Client = db.client
    const GanttChartTask = db.ganttChartTask
    const Product = db.product
    const Project = db.project
    const Invoice = db.invoice
    const Orders = db.order
    const Token = db.token

// Client relationship

    User.hasMany(Client, {
        foreignKey: 'serviceProviderId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Client.belongsTo(User);

//GanttChartTask Relation
    Project.hasMany(GanttChartTask, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    GanttChartTask.belongsTo(Project)

//Project relationship
Project.hasOne(Invoice, {
    foreignKey: 'projectId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Invoice.belongsTo(Project, {
    as: 'project',  
    foreignKey: {
        name: 'projectId',
        allowNull: false, 
    }
});

    User.hasMany(Project, {
        foreignKey: 'serviceProviderId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Project.belongsTo(User, {
        as: 'serviceProvider',
        foreignKey: {
            name: 'serviceProviderId',
            allowNull: false, 
        }

    })


    Client.hasMany(Project, {
        foreignKey: 'clientId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Project.belongsTo(Client, {
        as: 'client',
        foreignKey: {
            name: 'clientId',
            allowNull: false, 
        }
    })

//invoice relationship
    User.hasMany(Invoice, {
        foreignKey: 'serviceProviderId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Invoice.belongsTo(User, {
        as: 'serviceProvider',  
        foreignKey: {
            name: 'serviceProviderId',
            allowNull: false, 
        }
    });

    Client.hasMany(Invoice, {
        foreignKey: 'clientId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Invoice.belongsTo(Client, {
        as: 'client',  
        foreignKey: {
            name: 'clientId',
            allowNull: false, 
        }
    });


    

    //orders
    Client.hasMany(Orders, {
        foreignKey: 'clientId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Orders.belongsTo(Client, {
        as: 'client',
        foreignKey: {
            name: 'clientId',
            allowNull: false
        }
    });

    User.hasMany(Orders, {
        foreignKey: 'serviceProviderId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Orders.belongsTo(User, {
        as: 'serviceProvider',
        foreignKey: {
            name: 'serviceProviderId',
            allowNull: false
        }
    });

    Invoice.hasOne(Orders, {
        foreignKey: 'invoiceId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Orders.belongsTo(Invoice, {
        as: 'invoice',
        foreignKey: {
            name: 'invoiceId',
            allowNull: false
        }
    });

   
    Project.hasOne(Orders, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Orders.belongsTo(Project, {
        as: 'project',
        foreignKey: {
            name: 'projectId',
            allowNull: false
        }
    });
    //product
    User.hasMany(Product, {
        foreignKey: 'creatorId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Orders.belongsTo(Project, {
        as: 'user',
        foreignKey: {
            name: 'creatorId',
            allowNull: false
        }
    });

    db.sequelize.sync({
        // force: true,
    })
    Logger.info('✌️ DB loaded and connected!');
    await expressLoader(app)
    Logger.info('✌️ Express loaded');
}