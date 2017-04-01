namespace Karteikarten_Webapi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {

            CreateTable(
                "dbo.AspNetUsers",
                c => new
                {
                    Id = c.String(nullable: false, maxLength: 128),
                    //FirstName = c.String(nullable: false, maxLength: 100),
                    //LastName = c.String(nullable: false, maxLength: 100),
                    //Level = c.Byte(nullable: false),
                    //JoinDate = c.DateTime(nullable: false),
                    Email = c.String(maxLength: 256),
                    EmailConfirmed = c.Boolean(nullable: true),
                    PasswordHash = c.String(),
                    SecurityStamp = c.String(),
                    PhoneNumber = c.String(),
                    PhoneNumberConfirmed = c.Boolean(nullable: true),
                    TwoFactorEnabled = c.Boolean(nullable: true),
                    LockoutEndDateUtc = c.DateTime(),
                    LockoutEnabled = c.Boolean(nullable: true),
                    AccessFailedCount = c.Int(nullable: false),
                    UserName = c.String(nullable: false, maxLength: 256),
                })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");

        }

        public override void Down()
        {

            DropTable("dbo.AspNetUsers");
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
        }
    }
}

