﻿// <auto-generated />
using LegoLog.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LegoLog.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20210630163607_AddPhotoURLToLego")]
    partial class AddPhotoURLToLego
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("LegoLog.Models.BuildList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Theme")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("BuildLists");
                });

            modelBuilder.Entity("LegoLog.Models.Lego", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("BuildListId")
                        .HasColumnType("integer");

                    b.Property<string>("Comment")
                        .HasColumnType("text");

                    b.Property<bool>("FinishedLego")
                        .HasColumnType("boolean");

                    b.Property<bool>("InProgress")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PhotoURL")
                        .HasColumnType("text");

                    b.Property<string>("PieceCount")
                        .HasColumnType("text");

                    b.Property<string>("Price")
                        .HasColumnType("text");

                    b.Property<int>("Rating")
                        .HasColumnType("integer");

                    b.Property<string>("SerialNumber")
                        .HasColumnType("text");

                    b.Property<string>("Theme")
                        .HasColumnType("text");

                    b.Property<int>("WishListId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("BuildListId");

                    b.HasIndex("WishListId");

                    b.ToTable("Legos");
                });

            modelBuilder.Entity("LegoLog.Models.WishList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Theme")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("WishLists");
                });

            modelBuilder.Entity("LegoLog.Models.Lego", b =>
                {
                    b.HasOne("LegoLog.Models.BuildList", null)
                        .WithMany("Legos")
                        .HasForeignKey("BuildListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LegoLog.Models.WishList", null)
                        .WithMany("Legos")
                        .HasForeignKey("WishListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("LegoLog.Models.BuildList", b =>
                {
                    b.Navigation("Legos");
                });

            modelBuilder.Entity("LegoLog.Models.WishList", b =>
                {
                    b.Navigation("Legos");
                });
#pragma warning restore 612, 618
        }
    }
}
