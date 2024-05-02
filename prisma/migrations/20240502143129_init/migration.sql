-- CreateTable
CREATE TABLE "business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "linkMap" TEXT NOT NULL,
    "linkReview" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "approximate_date" TEXT NOT NULL,
    "text" TEXT,
    "answer" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusinessToReview" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessToReview_AB_unique" ON "_BusinessToReview"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessToReview_B_index" ON "_BusinessToReview"("B");

-- AddForeignKey
ALTER TABLE "_BusinessToReview" ADD CONSTRAINT "_BusinessToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToReview" ADD CONSTRAINT "_BusinessToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
