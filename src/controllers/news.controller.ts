import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {News} from '../models';
import {NewsRepository} from '../repositories';

export class NewsController {
    constructor(@repository(NewsRepository) public newsRepository: NewsRepository) {}

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @post('/news')
    @response(200, {
        description: 'News model instance',
        content: {'application/json': {schema: getModelSchemaRef(News)}}
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(News, {
                        title: 'NewNews',
                        exclude: ['newId']
                    })
                }
            }
        })
        news: Omit<News, 'newId'>
    ): Promise<News> {
        return this.newsRepository.create(news);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/news/count')
    @response(200, {
        description: 'News model count',
        content: {'application/json': {schema: CountSchema}}
    })
    async count(@param.where(News) where?: Where<News>): Promise<Count> {
        return this.newsRepository.count(where);
    }

    // @authorize({allowedRoles: ['ROLE_ADMIN', 'ROLE_USER']})
    @get('/news')
    @response(200, {
        description: 'Array of News model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(News, {includeRelations: true})
                }
            }
        }
    })
    async find(@param.filter(News) filter?: Filter<News>): Promise<News[]> {
        return this.newsRepository.find(filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/news')
    @response(200, {
        description: 'News PATCH success count',
        content: {'application/json': {schema: CountSchema}}
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(News, {partial: true})
                }
            }
        })
        news: News,
        @param.where(News) where?: Where<News>
    ): Promise<Count> {
        return this.newsRepository.updateAll(news, where);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @get('/news/{id}')
    @response(200, {
        description: 'News model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(News, {includeRelations: true})
            }
        }
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(News, {exclude: 'where'})
        filter?: FilterExcludingWhere<News>
    ): Promise<News> {
        return this.newsRepository.findById(id, filter);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @patch('/news/{id}')
    @response(204, {
        description: 'News PATCH success'
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(News, {partial: true})
                }
            }
        })
        news: News
    ): Promise<void> {
        await this.newsRepository.updateById(id, news);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @put('/news/{id}')
    @response(204, {
        description: 'News PUT success'
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() news: News): Promise<void> {
        await this.newsRepository.replaceById(id, news);
    }

    @authenticate('jwt')
    @authorize({allowedRoles: ['ROLE_ADMIN']})
    @del('/news/{id}')
    @response(204, {
        description: 'News DELETE success'
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.newsRepository.deleteById(id);
    }
}
