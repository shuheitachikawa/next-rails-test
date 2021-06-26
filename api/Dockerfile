# ベースイメージ
FROM ruby:2.7

ENV LANG=C.UTF-8 \
  TZ=Asia/Tokyo

# Dockerの仮想環境内で作業する場所
WORKDIR /app
RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client
# Gemfileを仮想環境内に/app内にコピー
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

# Start the main process.
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
