# # ベースイメージ
# FROM ruby:2.7

# # Dockerの仮想環境内で作業する場所
# WORKDIR /app
# RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
# # Gemfileを仮想環境内に/app内にコピー
# COPY Gemfile /app/Gemfile
# COPY Gemfile.lock /app/Gemfile.lock
# RUN bundle install
# COPY . /app

# EXPOSE 3000

# # Start the main process.
# CMD ["rails", "server", "-b", "0.0.0.0"]


FROM ruby:2.7

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN mkdir /app
WORKDIR /app

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

RUN apt-get update -qq && \
  apt-get install -y build-essential \
  libpq-dev \
  sudo \
  nginx && \
  gem install bundler:2.0.1

RUN bundle install

ADD . /app
RUN mkdir -p tmp/sockets
# RUN mkdir tmp/pids

# nginx
RUN groupadd nginx
RUN useradd -g nginx nginx
ADD nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]