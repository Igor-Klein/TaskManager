FROM ruby:latest

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qqy && apt-get -qqyy install \
    nodejs \
    yarn

RUN mkdir -p /task_manager
WORKDIR /task_manager

COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 3

COPY . /task_manager

RUN SECRET_KEY_BASE=secret RAILS_ENV=production bundle exec rails assets:precompile

EXPOSE 3000
CMD rm tmp/pids/server.pid; bundle exec rails s -b '0.0.0.0' -p 3000
