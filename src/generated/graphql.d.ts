import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel } from './entities/user.entity';
import { Context } from '../types';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: AuthPayload;
  login: AuthPayload;
};


export type MutationSignupArgs = {
  input: AuthInput;
};


export type MutationLoginArgs = {
  input: AuthInput;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  film: Film;
  films: Array<Film>;
  hero: Hero;
  specie: Specie;
  species: Array<Specie>;
};


export type QueryFilmArgs = {
  id: Scalars['ID'];
};


export type QueryHeroArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QuerySpecieArgs = {
  id: Scalars['ID'];
};

export type Film = {
  __typename?: 'Film';
  created: Scalars['String'];
  director: Scalars['String'];
  edited: Scalars['String'];
  episode_id: Scalars['Int'];
  opening_crawl: Scalars['String'];
  producer: Scalars['String'];
  relase_date: Scalars['String'];
  title: Scalars['String'];
};

export type Hero = {
  __typename?: 'Hero';
  name: Scalars['String'];
  height: Scalars['String'];
  mass: Scalars['String'];
  hair_color: Scalars['String'];
  skin_color: Scalars['String'];
  eye_color: Scalars['String'];
  birth_year: Scalars['String'];
  gender: Scalars['String'];
  created: Scalars['DateTime'];
  edited: Scalars['DateTime'];
};


export type Specie = {
  __typename?: 'Specie';
  name: Scalars['String'];
  classification: Scalars['String'];
  designation: Scalars['String'];
  average_height: Scalars['String'];
  skin_colors: Scalars['String'];
  hair_colors: Scalars['String'];
  eye_colors: Scalars['String'];
  average_lifespan: Scalars['String'];
  homeworld: Scalars['String'];
  language: Scalars['String'];
  created: Scalars['String'];
  edited: Scalars['String'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Mutation: ResolverTypeWrapper<{}>;
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user: ResolversTypes['User'] }>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AuthInput: AuthInput;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Film: ResolverTypeWrapper<Film>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Hero: ResolverTypeWrapper<Hero>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Specie: ResolverTypeWrapper<Specie>;
  User: ResolverTypeWrapper<UserModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Mutation: {};
  AuthPayload: Omit<AuthPayload, 'user'> & { user: ResolversParentTypes['User'] };
  String: Scalars['String'];
  AuthInput: AuthInput;
  Query: {};
  ID: Scalars['ID'];
  Film: Film;
  Int: Scalars['Int'];
  Hero: Hero;
  DateTime: Scalars['DateTime'];
  Specie: Specie;
  User: UserModel;
  Boolean: Scalars['Boolean'];
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signup?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
};

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  film?: Resolver<ResolversTypes['Film'], ParentType, ContextType, RequireFields<QueryFilmArgs, 'id'>>;
  films?: Resolver<Array<ResolversTypes['Film']>, ParentType, ContextType>;
  hero?: Resolver<ResolversTypes['Hero'], ParentType, ContextType, RequireFields<QueryHeroArgs, never>>;
  specie?: Resolver<ResolversTypes['Specie'], ParentType, ContextType, RequireFields<QuerySpecieArgs, 'id'>>;
  species?: Resolver<Array<ResolversTypes['Specie']>, ParentType, ContextType>;
};

export type FilmResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Film'] = ResolversParentTypes['Film']> = {
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  director?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  episode_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  opening_crawl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relase_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HeroResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Hero'] = ResolversParentTypes['Hero']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mass?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hair_color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skin_color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eye_color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  birth_year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type SpecieResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Specie'] = ResolversParentTypes['Specie']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  classification?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  designation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  average_height?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skin_colors?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hair_colors?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eye_colors?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  average_lifespan?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  homeworld?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Mutation?: MutationResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Film?: FilmResolvers<ContextType>;
  Hero?: HeroResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Specie?: SpecieResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
