namespace Karteikarten_Webapi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                  "dbo.KarteikartenUsers",
                  c => new
                      {
                          Id = c.String(nullable: false, maxLength: 128),
                          Email = c.String(nullable: false, maxLength: 256),
                          Username = c.String(nullable: false),
                          Password = c.String(nullable: false, maxLength: 100),
                          PasswordHash = c.String(),
                          SecurityStamp = c.String(),
                      })
                  .PrimaryKey(t => t.Id);
        }
        
        public override void Down()
        {
            DropTable("dbo.AspNetUsers");
        }
    }
}
