import React from 'react';
import Star from '../Helpers/icons/Star';
import DefaultImage from '../../assets/DefaultImage.png';

export default function Reviews({ comments }) {
  return (
    <div className="review-wrapper w-full">
      <div className="w-full reviews mb-[60px]">
        {/* comments */}
        <div className="w-full comments mb-[60px]">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="comment-item bg-white px-10 py-[32px] mb-2.5 shadow rounded-lg"
              >
                <div className="comment-author flex justify-between items-center mb-3">
                  <div className="flex space-x-3 items-center">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_PUBLIC_URL}/${comment.image}`}
                        alt={comment.first_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = DefaultImage;
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-[18px] font-medium text-qblack">
                        {comment.first_name}
                      </p>
                      <p className="text-[13px] font-normal text-qgray">
                        {comment.time_ago}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {Array.from({ length: comment.rating }).map((_, index) => (
                        <span key={index}>
                          <Star />
                        </span>
                      ))}
                    </div>
                    <span className="text-[13px] font-normal text-qblack mt-1 inline-block">
                      ({comment.rating}.0)
                    </span>
                  </div>
                </div>
                <div className="comment mb-[30px]">
                  <p className="text-[15px] text-qgray leading-7 text-normal">
                    {comment.review_text}
                  </p>
                </div>
                {comment.replys &&
                  comment.replys.length > 0 &&
                  comment.replys.map((reply) => (
                    <div
                      key={reply.id}
                      className="sub-comment-item bg-white px-10 pt-[32px] border-t"
                    >
                      <div className="comment-author mb-3">
                        <div className="flex space-x-3 items-center">
                          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                            <img
                              src={`${
                                import.meta.env.VITE_PUBLIC_URL
                              }/assets/images/comment-user-2.png`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[18px] font-medium text-qblack">
                              {reply.author}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="comment mb-[30px]">
                        <p className="text-[15px] text-qgray leading-7 text-normal">
                          {reply.comments}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <p className="text-center text-qgray text-[15px]">
              No comments found.
            </p>
          )}
        </div>
        {/* load comments */}
        <div className="w-full flex justify-center">
          <button
            type="button"
            className="black-btn w-[300px] h-[50px] text-sm font-semibold"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
