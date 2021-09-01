# [3.0.0](https://github.com/alx-plugins/obsidian-bridge/compare/2.4.1...3.0.0) (2021-09-01)


### Bug Fixes

* **scan:** update error prompt ([33e8312](https://github.com/alx-plugins/obsidian-bridge/commit/33e83128f26c7d3855574680862d81d0ef1d4f2f))
* **sender:** fix toc data not being sent ([69cd000](https://github.com/alx-plugins/obsidian-bridge/commit/69cd000075d9a44c1d5e8a0e916d8b17373d82e5))


### Features

* **scan:** toc now expose more params ([903b0cd](https://github.com/alx-plugins/obsidian-bridge/commit/903b0cd065ec52905e8e22052bc6b678a0455b35))


### BREAKING CHANGES

* **scan:** toc.noteTitle is now optional

## [2.4.1](https://github.com/alx-plugins/obsidian-bridge/compare/2.4.0...2.4.1) (2021-08-28)


### Performance Improvements

* **scan:** reduce childNotes scan level to avoid performance issue ([6b89405](https://github.com/alx-plugins/obsidian-bridge/commit/6b89405a250bf7758c8a1f5dbc6b84e9f05d4eb3))

# [2.4.0](https://github.com/alx-plugins/obsidian-bridge/compare/2.3.3...2.4.0) (2021-08-28)


### Features

* **api:** add linkNotes to data ([04737b6](https://github.com/alx-plugins/obsidian-bridge/commit/04737b6a0eff781c8fa0920f9b11da5aa30ccc75))

## [2.3.3](https://github.com/alx-plugins/obsidian-bridge/compare/2.3.2...2.3.3) (2021-08-26)


### Bug Fixes

* **api:** fix ReturnBody_Sel def ([91ee051](https://github.com/alx-plugins/obsidian-bridge/commit/91ee051b71d86f0507cff3fd10b3a59a6e7bbc73))

## [2.3.2](https://github.com/alx-plugins/obsidian-bridge/compare/2.3.1...2.3.2) (2021-08-25)


### Bug Fixes

* **url-obj:** fix data loss during conversion ([2b3ca72](https://github.com/alx-plugins/obsidian-bridge/commit/2b3ca72082229ef104f8407d50d44ce35f9de7d4))

## [2.3.1](https://github.com/alx-plugins/obsidian-bridge/compare/2.3.0...2.3.1) (2021-08-24)


### Bug Fixes

* **lib:** fix type error ([44aa04c](https://github.com/alx-plugins/obsidian-bridge/commit/44aa04c6fe87c7bc1e2157d670dd3c28dcd273ff))

# [2.3.0](https://github.com/alx-plugins/obsidian-bridge/compare/2.2.1...2.3.0) (2021-08-24)


### Features

* **lib:** expose JsonToObj ([3caa608](https://github.com/alx-plugins/obsidian-bridge/commit/3caa6087058b40ceb3e4fbbb844455961548115d))

## [2.2.1](https://github.com/alx-plugins/obsidian-bridge/compare/2.2.0...2.2.1) (2021-08-24)


### Bug Fixes

* **toggle-addon:** fix hint when addon enabled ([91e7b23](https://github.com/alx-plugins/obsidian-bridge/commit/91e7b238ad9e1004a4fb35021f7fb21a46d0b44b))

# [2.2.0](https://github.com/alx-plugins/obsidian-bridge/compare/2.1.0...2.2.0) (2021-08-23)


### Bug Fixes

* **package.json:** fix peerDependencies ([e3e7582](https://github.com/alx-plugins/obsidian-bridge/commit/e3e758274cf47ff7a63c62bbcded1de8338f5084))
* **scan:** fix scanToc and scanNote unable to scan props ([249ce49](https://github.com/alx-plugins/obsidian-bridge/commit/249ce49e0e2d74aa41ee40f88e3b0890c7decb8e))


### Features

* add tool lib for api ([3306325](https://github.com/alx-plugins/obsidian-bridge/commit/330632583aa7340722de9aa92fb21a5b5ad04d72))
* **api:** api export Date.getTime() for Date ([13e4129](https://github.com/alx-plugins/obsidian-bridge/commit/13e4129dcaba0d34bfe14d7222e9cf9fe7e6892f))
* send to obsidian via url in favor of clipboard ([25ccae1](https://github.com/alx-plugins/obsidian-bridge/commit/25ccae15c69ff46cb22256ab147384984b218fe6))
* **sender:** use clipboard on mac while use url in ios devices ([faf52b7](https://github.com/alx-plugins/obsidian-bridge/commit/faf52b7dac610e6f4a688c345318c2434876b5af))

# [2.1.0](https://github.com/alx-plugins/obsidian-bridge/compare/2.0.0...2.1.0) (2021-08-22)


### Features

* **api:** add addon version ([bcb32e5](https://github.com/alx-plugins/obsidian-bridge/commit/bcb32e569ccd51d09d8230acb9361eae37db65cd))

# [2.0.0](https://github.com/alx-plugins/obsidian-bridge/compare/1.1.2...2.0.0) (2021-08-22)


### Bug Fixes

* **parser:** mediaList now only includes png resouces ([c7e242d](https://github.com/alx-plugins/obsidian-bridge/commit/c7e242df2616dc8df4f47a657473d2a9f7a4de12))


### Features

* add fetch toc mode ([c9bf479](https://github.com/alx-plugins/obsidian-bridge/commit/c9bf47983c0483742979fb62ad59b14e7283d0d1))


### BREAKING CHANGES

* api: add ReturnBody_Toc; mediaList -> mediaMap; add bookMap for ReturnBody_Note and
ReturnBody_Toc ...

## [1.1.2](https://github.com/alx-plugins/obsidian-bridge/compare/1.1.1...1.1.2) (2021-05-05)


### Bug Fixes

* add logic to ignore internal media data ([4f25e83](https://github.com/alx-plugins/obsidian-bridge/commit/4f25e83d6422efd60c3395c4777b41d597e62a7a))

## [1.1.1](https://github.com/alx-plugins/obsidian-bridge/compare/1.1.0...1.1.1) (2021-05-05)


### Bug Fixes

* **main.ts:** change names of togglePlugin and self.plugin_on to avoid conflict ([83a2a40](https://github.com/alx-plugins/obsidian-bridge/commit/83a2a40897a2459f65f714d1324ab22c0f292e5c))

# [1.1.0](https://github.com/alx-plugins/obsidian-bridge/compare/1.0.0...1.1.0) (2021-05-05)


### Bug Fixes

* fix import from PopupRecorder ([5bab58c](https://github.com/alx-plugins/obsidian-bridge/commit/5bab58c915b50d9553a0a1eab60fec24c4ed46c3))


### Features

* now mediaList is included in the api ([65abaa1](https://github.com/alx-plugins/obsidian-bridge/commit/65abaa1d3e09e40934e87deac4241bd6f37e5ed1))

# [1.0.0](https://github.com/alx-plugins/obsidian-bridge/compare/v0.1.2...1.0.0) (2021-04-30)


### Features

* update api ([e33fdb0](https://github.com/alx-plugins/obsidian-bridge/commit/e33fdb0c4e433998bd0d72f548e76d7fa541f004))


### BREAKING CHANGES

* now ReturnBody.last no longer return empty object, returning null instead

## [0.1.1](https://github.com/alx-plugins/obsidian-bridge/compare/0.1.0...0.1.1) (2021-04-29)

# [0.1.0](https://github.com/alx-plugins/obsidian-bridge/compare/0.0.2...0.1.0) (2021-04-29)


### Bug Fixes

* **tools.ts:** add null checks to scanObject() ([ce1e8c4](https://github.com/alx-plugins/obsidian-bridge/commit/ce1e8c41212f892664cea6498a8784f35e8613c4))


### Features

* support book info output ([f81e4eb](https://github.com/alx-plugins/obsidian-bridge/commit/f81e4eb4a9d6560a6c180ea58f445f78d63f1ae3))

## [0.0.2](https://github.com/alx-plugins/obsidian-bridge/compare/0.0.1...0.0.2) (2021-04-26)

## 0.0.1 (2021-04-25)

