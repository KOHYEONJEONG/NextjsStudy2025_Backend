import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(createReviewDto: CreateReviewDto) {
    return await this.prisma.review.create({
      data: { ...createReviewDto, bookId: +createReviewDto.bookId },
    });
  }

  async findAllReviews() {
    //Prisma ORM을 사용해서 review 테이블의 모든 데이터를 조회
    //Next.js + TypeScript + Prisma ORM 조합에서 사용하는 Prisma 코드
    return await this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findBookReviews(bookId: number) {
    return await this.prisma.review.findMany({
      where: {
        bookId: bookId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateReview(reviewId: number, updateReviewDto: UpdateReviewDto) {
    return await this.prisma.review.update({
      where: {
        id: +reviewId,
      },
      data: updateReviewDto,
    });
  }

  async removeReview(reviewId: number) {
    await this.prisma.review.delete({
      where: {
        id: +reviewId,
      },
    });
  }
}
