-- CreateTable
CREATE TABLE "sms_sender_ids" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "sender_id" VARCHAR(12) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sms_sender_ids_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sms_sender_ids_sender_id_key" ON "sms_sender_ids"("sender_id");

-- AddForeignKey
ALTER TABLE "sms_sender_ids" ADD CONSTRAINT "sms_sender_ids_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
